import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { createResetToken } from '../../apis/resetPassword';
import { ValidationError } from '../parts/ValidationError';
import { email_reg, flash_blue, flash_red } from '../../constants';
import { Spinner } from '../parts/Spinner';

export const TokenResetOutlet = () => {
  const [loading, setLoading] = useState(false);
  const [handleFlashMessage] = useOutletContext();
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createResetToken(data.email);
      if (res?.status === 201) {
        handleFlashMessage(flash_blue, res.message);
      } else {
        handleFlashMessage(flash_red, res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[480px] sb:w-full">
        <h2 className='text-lg font-bold mb-8'>パスワード変更</h2>
        <p className='text-xs mb-6'>入力したメールアドレス宛にパスワード変更用のリンクを送付します。</p>

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

        <input
          className="button-form"
          type="submit"
          value="送信"
          disabled={!isDirty || !isValid}
        />
      </form>
      {loading && <Spinner />}
    </>
  );
}
