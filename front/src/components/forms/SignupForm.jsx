import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { Signup } from '../../apis/signup';
import { ValidationError } from '../parts/ValidationError';

export const SignupForm = ({ handleClickSignup, handleClickLogin }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { setLoading } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await Signup(data.name, data.email, data.password);
      if (res?.logged_in === "wait") {
        handleClickSignup();
        alert("確認メールを送信しました。");
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[480px] sp:w-full px-8 py-10 rounded-sm bg-white">
      <h2 className='text-lg font-bold mb-6'>アカウント作成</h2>
      <p className='text-xs mb-6'>アカウントを作成することにより、利用規約およびプライバシポリシーに同意するものとします。</p>
      <input
        className="border p-3 text-sm"
        type="text"
        placeholder="ユーザー名"
        autoComplete='username'
        {...register("name", {
          required: {
            value: true,
            message: '入力してください'
          },
          maxLength: {
            value: 20,
            message: '20文字以内で入力してください'
          },
        })}
      />

      {errors.name?.types.required && (
        <ValidationError message={errors.name.message} />
      )}
      {errors.name?.types.maxLength && (
        <ValidationError message={errors.name.message} />
      )}

      <input
        className="border p-3 text-sm mt-4"
        type="email"
        placeholder="メールアドレス"
        autoComplete='email'
        {...register("email", {
          required: {
            value: true,
            message: '入力してください'
          },
          pattern: {
            value: /[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/i,
            message: '有効なメールアドレスを入力してください'
          }
        })}
      />

      {errors.email?.types.required && (
        <ValidationError message={errors.email.message} />
      )}
      {errors.email?.types.pattern && (
        <ValidationError message={errors.email.message} />
      )}

      <input
        className="border p-3 text-sm mt-4"
        type="password"
        placeholder="パスワード"
        autoComplete='new-password'
        {...register("password", {
          required: {
            value: true,
            message: '入力してください'
          },
          minLength: {
            value: 6,
            message: '6文字以上で入力してください'
          }
        })}
      />

      {errors.password?.types.required && (
        <ValidationError message={errors.password.message} />
      )}
      {errors.password?.types.minLength && (
        <ValidationError message={errors.password.message} />
      )}
      <input className="button-color
                      button-color:hover
                    text-white
                      w-full
                      py-3
                      mt-6
                      rounded-sm
                      duration-300
                      disabled:bg-gray-200"
        type="submit" value="新規登録" disabled={!isDirty || !isValid} />
      <button className='text-sm sp:text-xs mt-6' onClick={handleClickLogin}>ログインする</button>
    </form>
  );
}
