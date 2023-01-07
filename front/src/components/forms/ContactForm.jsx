import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { ValidationError } from '../parts/ValidationError';
import { Spinner } from '../parts/Spinner';
import { createContact } from '../../apis/contacts';
import { email_reg, flash_blue, flash_red } from '../../constants';

export const ContactForm = ({ handleFlashMessage }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const [state, setState] = useState(false);
  const { loading, setLoading, setLogoutMessage } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await createContact(data);
      if (res?.status === 201) {
        setState(true);
        setLogoutMessage({ flash_blue, message: res.message });
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
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          className="border p-3 text-sm"
          type="email"
          placeholder="メールアドレス(返信が必要な場合)"
          autoComplete='email'
          {...register("email", {
            pattern: {
              value: email_reg,
              message: '有効なメールアドレスを入力してください'
            }
          })}
        />

        {errors.email?.types.pattern && (
          <ValidationError message={errors.email.message} />
        )}

        <select
          className="border p-3 text-sm mt-4 bg- "
          type="text"
          placeholder="カテゴリ"
          {...register("category", {
            required: {
              value: true,
              message: '入力してください'
            },
          })}
        >
          <option value="">- 選択してください -</option>
          <option value="感想">感想</option>
          <option value="意見">意見・要望</option>
          <option value="不具合報告">不具合報告</option>
          <option value="違反報告">違反報告</option>
          <option value="その他">その他</option>
        </select>

        {errors.category?.types.required && (
          <ValidationError message={errors.category.message} />
        )}

        <textarea
          className="border p-3 text-sm mt-4 h-40"
          type="textarea"
          placeholder="内容"
          {...register("text", {
            required: {
              value: true,
              message: '入力してください'
            },
            maxLength: {
              value: 1000,
              message: '1000文字以内で入力してください'
            },
          })}
        />
        {errors.text?.types.required && (
          <ValidationError message={errors.text.message} />
        )}
        {errors.text?.types.maxLength && (
          <ValidationError message={errors.text.message} />
        )}
        <input
          className="button-form"
          type="submit"
          value="送信"
          disabled={!isDirty || !isValid}
        />
      </form>
      {state && <Navigate to='/' />}
      {loading && <Spinner />}
    </>
  );
}
