import { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { createResetToken } from '../../apis/resetPassword';
import { ValidationError } from '../parts/ValidationError';

export const TokenResetForm = ({handleClickPassword}) => {
  const { setLoading } = useContext(AuthContext);
  const location = useLocation();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
        const res = await createResetToken(data.email);
        if (res?.status === 200) {
          alert("パスワード再設定用のメールを送信しました。");
        } else {
          console.log('アカウントがありません。');
        }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sb:w-full px-8 py-10 rounded-sm bg-white relative">
        <h2 className='text-lg font-bold mb-8'>パスワード変更</h2>
        {location.pathname === '/' &&
        <p className='absolute top-3 right-4 text-sm hover:cursor-pointer' onClick={handleClickPassword}>×</p>}
        <input hidden autoComplete='username' />
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

      <input className="button-color
                        button-color:hover
                      text-white
                        w-full
                        py-3
                        mt-6
                        rounded-sm
                        duration-300
                      disabled:bg-gray-200"
        type="submit" value="送信" disabled={!isDirty || !isValid} />
      </form>
    </div>
  );
}
