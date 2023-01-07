import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useForm } from "react-hook-form";
import { ValidationError } from '../parts/ValidationError';
import { createComment } from '../../apis/comments';
import { MdSend } from 'react-icons/md';
import { flash_blue, flash_red } from '../../constants';

export const CommentForm = ({
  word,
  handleWords,
  handleFlashMessage,
  handleClickLogin,
  setCommented
}) => {

  const { setLoading, isSignedIn, currentUser } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors, isDirty, isValid } } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const onSubmit = async (data) => {
    if (isSignedIn) {
      try {
        const res = await createComment(currentUser.id, word.id, data.text);
        if (res?.status === 201) {
          reset();
          handleWords();
          setCommented(true);
          handleFlashMessage(flash_blue, res.message);
        } else {
          handleFlashMessage(flash_red, res.message);
        }
      } catch (e) {
        console.error(e);
        handleFlashMessage(flash_red, e.message);
      }
      setLoading(false);
    } else {
      handleFlashMessage(flash_red, "この機能はログインが必要です");
      handleClickLogin();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-sm"
    >

      <div className='flex'>
        <input
          className="form-comment-input"
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

        <button
          className="button-comment-form"
          type="submit"
          disabled={!isDirty || !isValid}
        >
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
