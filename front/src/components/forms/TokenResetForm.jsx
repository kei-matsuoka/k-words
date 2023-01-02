import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { createResetToken } from '../../apis/resetPassword';
import { ValidationError } from '../parts/ValidationError';
import { Spinner } from '../parts/Spinner';
import { MdClear } from 'react-icons/md';
import { email_reg } from '../../constants';

export const TokenResetForm = ({ handleClickPassword, handleFlashMessage }) => {
  const { loading, setLoading } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createResetToken(data.email);
      if (res?.status === 201) {
        handleClickPassword();
        handleFlashMessage("rgb(48, 200, 214)", res.message);
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form relative">
        <h2 className='text-lg font-bold mb-8'>パスワード変更</h2>
        <p className='text-xs mb-6'>入力したメールアドレス宛にパスワード更新用のリンクを送付します。</p>
        <MdClear className='absolute top-4 right-4 button-gray-500' onClick={handleClickPassword} />
        {/* <p >×</p> */}
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

        <input className="button-form" type="submit" value="送信" disabled={!isDirty || !isValid} />
      </form>
      {loading && <Spinner />}
    </div>
  );
}
