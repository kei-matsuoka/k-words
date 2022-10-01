import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { Login } from '../../apis/login';

export default function LoginForm({handleClickLogin}) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { setLoading, isSignedIn, setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await Login(data.email, data.password, data.password_confirmation);
      if (res?.data.logged_in === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.user);
        // handleClickLogin();
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-80 p-6 rounded-md bg-white">
        <div className='text-center'>
          <h2 className='text-2xl font-bold'>ログイン</h2>
        </div>
        <div className='flex flex-col items-center mt-8'>
          <input
            className="text-center border mt-2"
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
            <div>{errors.password.message}</div>
          )}
          {errors.password?.types.minLength && (
            <div>{errors.password.message}</div>
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
            type="submit" value="ログイン" />
        </div>
      </form>
    </div>
  );
}
