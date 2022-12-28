import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { useOutletContext } from "react-router-dom";
import { getUserWords } from '../../apis/words';
import { destroyWord } from '../../apis/words';
import { PatchWordForm } from "../forms/PatchWordForm";
import { Modal } from "../modals/Modal";
import { Words } from "../groups/Words";

export const WordsOutlet = () => {
  const [userWords, setUserWords] = useState([]);
  const [patchModalIsOpen, setPatchModalIsOpen] = useState(false);
  const [patchWord, setPatchWord] = useState();
  const { setLoading, currentUser } = useContext(AuthContext);
  const [handleFlashMessage] = useOutletContext();

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
      setPatchWord(word);
    } else {
      setPatchModalIsOpen(false);
    }
  };

  useEffect(() => {
    handleGetUserWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserWords]);

  return (
    <>
      {userWords ?
        <Words
          words={userWords}
          handleClickPatch={handleClickPatch}
          handleClickDestroy={handleClickDestroy}
          handleWords={handleGetUserWords}
        />
        :
        <p className="text-white text-sm mt-3">マイ用語がありません。</p>
      }
      <Modal
        onClick={handleClickPatch}
        isOpen={patchModalIsOpen}>
        <PatchWordForm
          handleGetUserWords={handleGetUserWords}
          handleClickPatch={handleClickPatch}
          handleFlashMessage={handleFlashMessage}
          word={patchWord}
        />
      </Modal>
    </>
  );
}
