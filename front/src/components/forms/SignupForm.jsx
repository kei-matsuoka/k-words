import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { Signup } from '../../apis/signup';
import { ValidationError } from '../parts/ValidationError';
import { Link } from 'react-router-dom';
import { Spinner } from '../parts/Spinner';
import { MdClear } from 'react-icons/md';
import { email_reg } from '../../constants';

export const SignupForm = ({ handleClickSignup, handleClickLogin, handleFlashMessage }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { loading, setLoading } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await Signup(data.name, data.email, data.password);
      if (res?.status === 201) {
        handleClickSignup();
        handleFlashMessage("rgb(48, 200, 214)", res.message);
      } else if (res.status === 400) {
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="form relative">
        <MdClear className='absolute top-4 right-4 button-gray-500' onClick={handleClickSignup} />
        <h2 className='text-lg font-bold mb-6'>アカウント作成</h2>
        <p className='text-xs mb-6'>アカウントを作成することにより、
          <Link to={"/policy"} target="_blank" className="text-sky-600">
            利用規約
          </Link>
          および
          <Link to={"/privacy"} target="_blank" className="text-sky-600">
            プライバシポリシー
          </Link>
          に同意するものとします。
        </p>
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
              value: email_reg,
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
        <input className="button-form" type="submit" value="新規登録" disabled={!isDirty || !isValid} />
        <div className='flex justify-center mt-6'>
          <p className='text-sm'>
            <span>既にアカウントをお持ちの場合 </span>
            <span
              className='text-sky-600 hover:cursor-pointer'
              onClick={() => { handleClickSignup(); handleClickLogin(); }}>
              ログイン
            </span>
          </p>
        </div>
      </form>
      {loading && <Spinner />}
    </>
  );
}
