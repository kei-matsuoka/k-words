import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { createWord } from '../../apis/words';
import { ValidationError } from '../parts/ValidationError';

export const WordForm = ({ handleGetWords, handleClickWord, handleFlashMessage }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { setLoading } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await createWord(data);
      if (res?.status === 201) {
        handleGetWords();
        handleClickWord();
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[480px] sp:w-full px-8 py-10 rounded-sm bg-white relative">
      <h2 className='text-lg font-bold mb-8'>用語を作成する</h2>
      <p className='absolute top-3 right-4 text-sm hover:cursor-pointer' onClick={handleClickWord}>×</p>
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

      <div>
        <input className="button-color
                          hover:button-color
                        text-white
                          w-full
                          py-3
                          mt-6
                          rounded-sm
                          duration-300"
          type="submit" value="新規作成" disabled={!isDirty || !isValid} />
      </div>
    </form>
  );
}
