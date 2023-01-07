import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { IoTrashSharp } from 'react-icons/io5';

export const Comment = ({ comment, handleWarning }) => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

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
      {isSignedIn && (comment.user.id === currentUser.id) &&
        <IoTrashSharp
          className='button-gray-500'
          onClick={() => handleWarning("コメント", comment.id)}
        />
      }
    </div>
  );
};
