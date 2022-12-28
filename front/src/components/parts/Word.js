import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useLocation } from 'react-router-dom';
import { CommentButton } from '../buttons/CommentButton';
import { DestroyButton } from '../buttons/DestroyButton';
import { FavoriteButton } from '../buttons/FavoriteButton';
import { PatchButton } from '../buttons/PatchButton';
import { UnFavoriteButton } from '../buttons/UnFavoriteButton';
import { handleFavorite } from '../../apis/favorites';

export const Word = ({ word, handleClickPatch, handleClickDestroy, handleClickLogin, handleFlashMessage, handleWords }) => {
  const { isSignedIn, currentUser, setLoading } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  const location = useLocation();
  const path = location.pathname

  const handleOnClickDestroy = () => {
    handleClickDestroy(word.id);
  };
  const handleOnClickPatch = () => {
    handleClickPatch(word);
  };

  const isFavorite = () => {
    if (isSignedIn && (path === '/' || path.indexOf("mypage") !== -1)) {
      if (word.users.findIndex(({ id }) => id === currentUser.id) !== -1) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    } else {
      setFavorite(false);
    }
  };

  const handleOnFavorite = async () => {
    if (isSignedIn) {
      try {
        const res = await handleFavorite(currentUser.id, word.id);
        if (res?.status === 201) {
          setFavorite(true);
          handleWords();
        } else {
          setFavorite(false);
          handleWords();
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

  useEffect(() => {
    isFavorite();
  }, [setFavorite, isSignedIn]);

  return (
    <article className='flex flex-col w-full px-8 pt-6 pb-5 mt-3 bg-white relative shadow rounded-sm'>
      {(path === '/mypage' || path === '/mypage/words') &&
        <div className='flex absolute top-4 right-6'>
          <div className='mr-1'><PatchButton handleOnClickPatch={handleOnClickPatch} /></div>
          <div><DestroyButton handleOnClickDestroy={handleOnClickDestroy} /></div>
        </div>
      }
      <h1 className="mb-1">{word.title}</h1>
      <div className="text-sm">
        <p>{word.meaning}</p>
        <p>{word.text}</p>
      </div>
      {(path === '/' || path.indexOf("mypage") !== -1) &&
        <div className='flex justify-between mt-3 text-xs'>
          <div className='flex items-center text-gray-500'>
            <div className='flex items-center mr-4'>
              {favorite ?
                <UnFavoriteButton handleOnFavorite={handleOnFavorite} />
                :
                <FavoriteButton handleOnFavorite={handleOnFavorite} />
              }
              <p className='ml-1'>{word.users.length}</p>
            </div>
            <div className='flex items-center'>
              <CommentButton />
              <p className='ml-1'>{"0"}</p>
            </div>
          </div>
          <p className=''>@{word.user.name}</p>
        </div>
      }
    </article>
  );
}
