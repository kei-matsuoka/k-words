import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchWord } from '../../apis/words';
import { MdClear } from 'react-icons/md';

export const PatchWordForm = ({ handleGetUserWords, handleClickPatch, handleFlashMessage, word }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      title: word.title,
      kana: word.kana,
      meaning: word.meaning,
      text: word.text
    }
  });
  const { setLoading } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      const res = await patchWord(data, word.id);
      if (res?.status === 200) {
        handleGetUserWords();
        handleClickPatch();
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
    <form onSubmit={handleSubmit(onSubmit)} className="form relative">
      <h2 className='text-lg font-bold mb-8'>用語を編集する</h2>
      <MdClear className='absolute top-4 right-4 button-gray-500' onClick={handleClickPatch} />
      <input
        className="border p-3 text-sm"
        type="text"
        placeholder="用語名"
        {...register("title", {
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

      {errors.title?.types.required && (
        <div className='text-red-500'>{errors.title.message}</div>
      )}
      {errors.title?.types.maxLength && (
        <div className='text-red-500'>{errors.title.message}</div>
      )}

      <input
        className="border p-3 text-sm mt-4"
        type="text"
        placeholder="かな"
        {...register("kana", {
          required: {
            value: true,
            message: '入力してください'
          },
          maxLength: {
            value: 30,
            message: '30文字以内で入力してください'
          },
        })}
      />

      {errors.kana?.types.required && (
        <div className='text-red-500'>{errors.kana.message}</div>
      )}
      {errors.kana?.types.maxLength && (
        <div className='text-red-500'>{errors.kana.message}</div>
      )}

      <input
        className="border p-3 text-sm mt-4"
        type="textarea"
        placeholder="意味"
        {...register("meaning", {
          required: {
            value: true,
            message: '入力してください'
          },
          maxLength: {
            value: 50,
            message: '50文字以内で入力してください'
          },
        })}
      />

      {errors.meaning?.types.required && (
        <div className='text-red-500'>{errors.meaning.message}</div>
      )}
      {errors.meaning?.types.maxLength && (
        <div className='text-red-500'>{errors.meaning.message}</div>
      )}

      <input
        className="border p-3 text-sm mt-4"
        type="textarea"
        placeholder="用例・補足"
        {...register("text", {
          maxLength: {
            value: 50,
            message: '50文字以内で入力してください'
          },
        })}
      />

      {errors.text?.types.maxLength && (
        <div className='text-red-500'>{errors.text.message}</div>
      )}

      <input className="button-form" type="submit" value="修正" disabled={!isDirty || !isValid} />
    </form>
  );
}
