import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../AuthProvider';
import { Login } from '../../apis/login';

export const LoginForm = ({handleClickLogin}) => {
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
          
          <p>パスワードを忘れた場合は<Link to='/password'>こちら</Link></p>

          <p>次回から自動でログインする</p>
          <input
            className="mt-2"
            type="checkbox"
            {...register("remember_me")}
          />

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
