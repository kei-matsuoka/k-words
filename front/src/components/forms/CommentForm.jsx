import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { createComment } from '../../apis/comments';
import { ValidationError } from '../parts/ValidationError';
import { MdSend } from 'react-icons/md';

export const CommentForm = ({ word, handleWords, handleFlashMessage, handleClickLogin }) => {
  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });
  const { setLoading, isSignedIn, currentUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (isSignedIn) {
      try {
        const res = await createComment(currentUser.id, word.id, data.text);
        if (res?.status === 201) {
          reset();
          handleWords();
          handleFlashMessage("rgb(48, 200, 214)", res.message);
        } else {
          handleFlashMessage("red", res.message);
        }
      } catch (e) {
        console.error(e);
        handleFlashMessage("red", e.message);
      }
      setLoading(false);
    } else {
      handleFlashMessage("red", "この機能を使用するにはログインが必要です");
      handleClickLogin();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-sm">

      <div className='flex'>
        <input
          className="text-sm px-2 py-1 w-full border rounded-sm shadow-inner"
          type="textarea"
          placeholder="コメント"
          {...register("text", {
            required: {
              value: true,
              message: '入力してください'
            },
            maxLength: {
              value: 255,
              message: '255文字以内で入力してください'
            },
          })}
        />

        <button className="button-comment-form" type="submit" disabled={!isDirty || !isValid}>
          <MdSend />
        </button>
      </div>

      <div className='text-xs'>
        {errors.text?.types.pattern && (
          <ValidationError message={errors.text.message} />
        )}
      </div>
    </form>
  );
}
