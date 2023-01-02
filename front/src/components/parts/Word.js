import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'
import { handleFavorite } from '../../apis/favorites';
import { Comment } from './Comment';
import { CommentForm } from '../forms/CommentForm';
import { MdModeComment, MdOutlineModeComment, MdFavorite, MdFavoriteBorder, MdEdit } from 'react-icons/md';
import { IoTrashSharp } from 'react-icons/io5';

export const Word = ({ word, handleClickPatch, handleClickDestroy, handleClickLogin, handleFlashMessage, handleWords }) => {
  const { isSignedIn, currentUser, setLoading } = useContext(AuthContext);
  const [favorite, setFavorite] = useState(false);
  const [commented, setCommented] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname

  const handleOnClickDestroy = () => {
    handleClickDestroy(word.id);
  };
  const handleOnClickPatch = () => {
    handleClickPatch(word);
  };
  const handleClickComment = () => {
    if (isSignedIn) {
      setIsOpen(isOpen ? false : true);
    } else {
      handleFlashMessage("red", "この機能を使用するにはログインが必要です");
      handleClickLogin();
    }
  };

  const isFavorite = () => {
    if (isSignedIn && (path === '/' || path.indexOf("mypage") !== -1)) {
      if (word.favorite_users.findIndex(({ id }) => id === currentUser.id) !== -1) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    } else {
      setFavorite(false);
    }
  };

  const isCommented = () => {
    if (isSignedIn && (path === '/' || path.indexOf("mypage") !== -1)) {
      if (word.commenters.findIndex(({ id }) => id === currentUser.id) !== -1) {
        setCommented(true);
      } else {
        setCommented(false);
      }
    } else {
      setCommented(false);
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
    isCommented();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <article className='flex flex-col w-full px-8 pt-6 pb-5 mt-3 bg-white relative shadow rounded-sm'>
      {(path === '/mypage' || path === '/mypage/words') &&
        <div className='flex absolute top-4 right-6'>
          <MdEdit className='button-gray-500 mr-1' onClick={handleOnClickPatch} />
          <IoTrashSharp className='button-gray-500' onClick={handleOnClickDestroy} />
        </div>
      }

      <h1 className="mb-1">{word.title}</h1>
      <div className="text-sm">
        <p>{word.meaning}</p>
        <p>{word.text}</p>
      </div>

      {(path === '/' || path.indexOf("mypage") !== -1) &&
        <>
          <div className='flex justify-between mt-3 text-xs'>
            <p className=''>by {word.user.name}</p>
            <div className='flex items-center text-gray-500'>
              <div className='flex items-center mr-4'>
                {commented ?
                  <MdModeComment size="14" className="button-default text-gray-800 hover:scale-110 mt-[1px]" onClick={handleClickComment} />
                  :
                  <MdOutlineModeComment size="14" className="button-scale mt-[1px]" onClick={handleClickComment} />
                }
                <p className='ml-1'>{word.comments.length}</p>
              </div>
              <div className='flex items-center'>
                {favorite ?
                  <MdFavorite size="15" className="button-default text-red-500 hover:scale-110 mt-[1px]" onClick={handleOnFavorite} />
                  :
                  <MdFavoriteBorder size="15" className="button-scale mt-[1px]" onClick={handleOnFavorite} />
                }
                <p className='ml-1'>{word.favorite_users.length}</p>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {isOpen &&
              <motion.div
                className='flex flex-col'
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "tween", duration: 0.4 }}
              >
                <div className='mt-5 pt-3 border-t'>
                  <CommentForm word={word} handleWords={handleWords} handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} />
                </div>
                <div className='flex flex-col pb-1 ml-2'>
                  {word.comments.map((comment) =>
                    <Comment
                      key={comment.id}
                      comment={comment}
                      handleFlashMessage={handleFlashMessage}
                      handleWords={handleWords}
                      handleClickLogin={handleClickLogin}
                    />
                  )}
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </>
      }
    </article>
  );
}
