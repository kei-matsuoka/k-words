import { useForm } from "react-hook-form";
import { ValidationError } from '../parts/ValidationError';
import { createWord } from '../../apis/words';
import { MdClear } from 'react-icons/md';
import { flash_blue, flash_red } from "../../constants";

export const WordForm = ({ handleGetWords, handleClickWord, handleFlashMessage }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    try {
      const res = await createWord(data);
      if (res?.status === 201) {
        handleClickWord();
        handleGetWords();
        handleFlashMessage(flash_blue, res.message);
      } else {
        handleFlashMessage(flash_red, res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form relative">
      <h2 className='text-lg font-bold mb-8'>用語を作成する</h2>
      <MdClear className='button-clear' onClick={handleClickWord} />
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

      <div className='flex'>
        {errors.title?.types.required && (
          <ValidationError message={errors.title.message} />
        )}
        {errors.title?.types.pattern && (
          <ValidationError message={errors.title.message} />
        )}
      </div>

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

      <div className='flex'>
        {errors.kana?.types.required && (
          <ValidationError message={errors.kana.message} />
        )}
        {errors.kana?.types.pattern && (
          <ValidationError message={errors.kana.message} />
        )}
      </div>

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

      <div className='flex'>
        {errors.meaning?.types.required && (
          <ValidationError message={errors.meaning.message} />
        )}
        {errors.meaning?.types.pattern && (
          <ValidationError message={errors.meaning.message} />
        )}
      </div>

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

      <div className='flex'>
        {errors.text?.types.maxLength && (
          <ValidationError message={errors.text.message} />
        )}
      </div>
      <input
        className="button-form"
        type="submit"
        value="新規作成"
        disabled={!isDirty || !isValid}
      />
    </form>
  );
}
