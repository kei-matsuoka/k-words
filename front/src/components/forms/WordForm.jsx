import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { createWord } from '../../apis/words';

export const WordForm = ({ handleGetWords, handleClickWord }) => {
  const { register, handleSubmit, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onBlur',
    criteriaMode: 'all',
  });
  const { setLoading } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const res = await createWord(data);
      if (res?.status === 200) {
        alert("wordが追加されました");
        handleGetWords();
        handleClickWord();
      } else {
        console.log('no current user');
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-80 p-6 rounded-md bg-white">
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>新しい用語を作成</h2>
        <p className='mt-4'>用語を作成することにより、利用規約およびプライバシポリシーに同意するものとします。</p>
      </div>
      <div className='flex flex-col items-center mt-8'>
        <input
          className="text-center border"
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
          className="text-center border"
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
          className="text-center border"
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
          className="text-center border"
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

      </div>
      <div>
        <input className="button-color
                          button-color:hover
                        text-white
                          py-3 
                          px-12
                          rounded-md
                          duration-300
                          mt-4
                          disabled:bg-gray-200"
          type="submit" value="新規作成" disabled={!isDirty || !isValid} />
      </div>
    </form>
  );
}
