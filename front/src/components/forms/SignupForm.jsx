import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { Signup } from '../../apis/signup';

export const SignupForm = ({ handleClickSignup }) => {
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
        alert("confirm email");
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-80 p-6 rounded-md bg-white">
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>アカウントを作成</h2>
        <p className='mt-4'>アカウントを作成することにより、利用規約およびプライバシポリシーに同意するものとします。</p>
      </div>
      <div className='flex flex-col items-center mt-8'>
        <input
          className="text-center border"
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
          <div className='text-red-500'>{errors.name.message}</div>
        )}
        {errors.name?.types.maxLength && (
          <div className='text-red-500'>{errors.name.message}</div>
        )}

        <input
          className="text-center border mt-2"
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
          <div className='text-red-500'>{errors.email.message}</div>
        )}
        {errors.email?.types.pattern && (
          <div className='text-red-500'>{errors.email.message}</div>
        )}

        <input
          className="text-center border mt-2"
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
          <div className='text-red-500'>{errors.password.message}</div>
        )}
        {errors.password?.types.minLength && (
          <div className='text-red-500'>{errors.password.message}</div>
        )}

      </div>
      <div>
        <input className="button-color
                          button-color:hover
                        text-white
                          py-3 
                          px-12
                          rounded-md
                          duration-300
                          mt-4
                          disabled:bg-gray-200"
          type="submit" value="新規登録" disabled={!isDirty || !isValid} />
      </div>
    </form>
  );
}
