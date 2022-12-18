import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { patchWord } from '../../apis/words';

export const PatchWordForm = ({ handleGetUserWords, handleClickPatch, word }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
    defaultValues: {
      title: word.title,
      kana: word.kana,
      meaning: word.meaning,
      text: word.text
    }
  });
  const { setLoading, setFlashMessage } = useContext(AuthContext);
  const onSubmit = async (data) => {
    try {
      const res = await patchWord(data, word.id);
      if (res?.status === 200) {
        handleGetUserWords();
        handleClickPatch();
        setFlashMessage({ message: "用語を修正しました" });
      } else {
        setFlashMessage({ color: "red", message: "用語の修正に失敗しました" });
      }
    } catch (e) {
      console.log(e);
      setFlashMessage({ color: "red", message: e.message });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[480px] sp:w-full px-8 py-10 rounded-sm bg-white">
      <h2 className='text-lg font-bold mb-8'>用語を編集する</h2>
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

      <input className="button-color
                        button-color:hover
                      text-white
                        w-full
                        py-3
                        mt-6
                        rounded-sm
                        duration-300
                      disabled:bg-gray-200"
        type="submit" value="修正" disabled={!isDirty || !isValid} />
    </form>
  );
}
