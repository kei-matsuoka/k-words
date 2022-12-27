import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { getUserWords } from '../../apis/users';
import { destroyWord } from '../../apis/words';
import { PatchWordForm } from "../forms/PatchWordForm";
import { Modal } from "../modals/Modal";
import { Words } from "../groups/Words";

export const MyPage = ({ handleFlashMessage, setTitle }) => {
  const [userWords, setUserWords] = useState([]);
  const [patchModalIsOpen, setPatchModalIsOpen] = useState(false);
  const [word, setWord] = useState();
  const { setLoading, currentUser } = useContext(AuthContext);

  const handleGetUserWords = async () => {
    try {
      const res = await getUserWords(currentUser.id);
      if (res?.status === 200) {
        setUserWords(res.words);
      } else {
        console.log(res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  const handleClickDestroy = async (id) => {
    try {
      const res = await destroyWord(id);
      if (res?.status === 200) {
        handleGetUserWords();
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

  const handleClickPatch = (word) => {
    if (!patchModalIsOpen) {
      setPatchModalIsOpen(true);
      setWord(word);
    } else {
      setPatchModalIsOpen(false);
    }
  };

  useEffect(() => {
    handleGetUserWords();
    setTitle("マイページ");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserWords]);

  return (
    <>
      {patchModalIsOpen &&
        <Modal
          onClick={handleClickPatch}
          isOpen={patchModalIsOpen}>
          <PatchWordForm
            handleGetUserWords={handleGetUserWords}
            handleClickPatch={handleClickPatch}
            handleFlashMessage={handleFlashMessage}
            word={word}
          />
        </Modal>
      }
      <div className='flex w-full h-12 rounded-t bg-gray-50'>
        <button className='flex justify-center items-center w-1/3 h-12 bg-gray-800 text-white rounded-t'>
          マイ単語
        </button>
        <button className='flex justify-center items-center w-1/3 h-12 bg-white border-t border-r rounded-t'>
          お気に入り
        </button>
        <button className='flex justify-center items-center w-1/3 h-12 bg-white border-t border-r rounded-t'>
          コメント
        </button>
      </div>
      <div className="w-full bg-gray-800 rounded-b shadow-sm px-4 pb-4 pt-1">
        {userWords ?
          <Words
            words={userWords}
            handleClickPatch={handleClickPatch}
            handleClickDestroy={handleClickDestroy}
          />
          :
          <p>マイ用語がありません</p>
        }
      </div>
    </>
  );
}
