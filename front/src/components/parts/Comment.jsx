import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { destroyComment } from '../../apis/comments';
import { IoTrashSharp } from 'react-icons/io5';

export const Comment = ({ comment, handleFlashMessage, handleWords, handleClickLogin }) => {
  const { setLoading, isSignedIn, currentUser } = useContext(AuthContext);

  const handleCommentDestroy = async () => {
    if (isSignedIn) {
      try {
        const res = await destroyComment(comment.id);
        if (res?.status === 200) {
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
    <div className="flex justify-between py-3 border-b">
      <div className='flex flex-col'>
        <div className="text-sm">
          {comment.text}
        </div>
        <div className="text-xs mt-2">
          by {comment.user.name}
        </div>
      </div>
      {comment.user.id === currentUser.id &&
        <IoTrashSharp className='button-gray-500' onClick={handleCommentDestroy} />
      }
    </div>
  );
};
