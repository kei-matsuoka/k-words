import { useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../AuthProvider';
import { Login } from '../../apis/login';
import { ValidationError } from '../parts/ValidationError';
import { MdClear } from 'react-icons/md';

export const LoginForm = ({ handleClickLogin, handleClickSignup, handleClickPassword, handleFlashMessage }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { setLoading, setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await Login(data.email, data.password, data.remember_me);
      if (res?.status === 201) {
        handleClickLogin();
        setIsSignedIn(true);
        setCurrentUser(res.user);
        handleFlashMessage("rgb(48, 200, 214)", "ログインしました");
      } else if (res?.status === 401) {
        handleFlashMessage("red", res.message);
      } else {
        handleFlashMessage("red", res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form relative">
      <h2 className='text-lg font-bold mb-8'>ログイン</h2>
      <MdClear className='absolute top-4 right-4 button-gray-500' onClick={handleClickLogin} />
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
      <input className="button-form" value="ログイン" type="submit" disabled={!isDirty || !isValid} />
      <div className='flex flex-col items-center justify-center text-sm mt-6'>
        <p>
          <span>パスワードを忘れた場合 </span>
          <span className='text-sky-600 hover:cursor-pointer' onClick={() => { handleClickLogin(); handleClickPassword(); }}>
            こちら
          </span>
        </p>
        <p className='my-1'>or</p>
        <p>
          <span>アカウントをお持ちでない場合 </span>
          <span className='text-sky-600 hover:cursor-pointer' onClick={() => { handleClickLogin(); handleClickSignup(); }}>
            新規登録
          </span>
        </p>
      </div>
    </form>
  );
}
