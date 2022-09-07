import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { Navigate } from 'react-router-dom';
import Signup from '../../apis/signup';

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { setLoading, isSignedIn, setIsSignedIn, setCurrentUser, setCards } = useContext(AuthContext);
  const regex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/;

  const onSubmit = async (data) => {
    try {
      const res = await Signup(data.name, data.email, data.password, data.password_confirmation);
      if (res?.data.logged_in === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.user);
        setCards(res?.data.cards);
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <div>
      {isSignedIn ? <Navigate to='/dashboard' />
        :
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
                  value: { regex },
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

            <input
              className="text-center border mt-2"
              type="password"
              placeholder="パスワード確認"
              autoComplete='new-password'
              {...register("password_confirmation", {
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

            {errors.password_confirmation?.types.required && (
              <div className='text-red-500'>{errors.password_confirmation.message}</div>
            )}
            {errors.password_confirmation?.types.minLength && (
              <div className='text-red-500'>{errors.password_confirmation.message}</div>
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
                              mt-4"
              type="submit" value="新規登録" />
          </div>
        </form>
      }
    </div>
  );
}
