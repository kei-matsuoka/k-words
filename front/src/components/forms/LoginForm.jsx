import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../AuthProvider';
import { Login } from '../../apis/login';
import { ValidationError } from '../parts/ValidationError';

export const LoginForm = ({ handleClickLogin, handleClickSignup }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { setLoading, setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await Login(data.email, data.password, data.remember_me);
      if (res?.logged_in === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.user);
        handleClickLogin();
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[480px] sp:w-full px-8 py-10 rounded-sm bg-white">
      <h2 className='text-lg font-bold mb-8'>ログイン</h2>
      <input
        className="border p-3 text-sm"
        type="email"
        placeholder="メールアドレス"
        autoComplete="email"
        {...register("email", {
          required: {
            value: true,
            message: '入力してください'
          },
          pattern: {
            value: /[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+/i,
            message: '正しいメールアドレスを入力してください'
          }
        })}
      />
      <div className='flex'>
        {errors.email?.types.required && (
          <ValidationError message={errors.email.message} />
        )}
        {errors.email?.types.pattern && (
          <ValidationError message={errors.email.message} />
        )}
      </div>

      <input
        className="border p-3 text-sm mt-4"
        type="password"
        placeholder="パスワード"
        autoComplete="current-password"
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

      <div className='flex items-center mt-2 ml-2'>
        <input
          className='mr-1'
          type="checkbox"
          {...register("remember_me")}
        />
        <p className='text-sm'>次回から自動でログインする</p>
      </div>
      <input className="button-color
                        hover:button-color
                      text-white
                        w-full
                        py-3
                        mt-6
                        rounded-sm
                        duration-300"
        type="submit" value="ログイン" />
      <div className='flex justify-center text-sm sp:text-xs mt-6'>
        <Link to='/password'>パスワードを忘れた</Link>
        <p className='mx-2'>or</p>
        <button onClick={handleClickSignup}>アカウントを作成する</button>
      </div>
    </form>
  );
}
