import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { useOutletContext } from "react-router-dom";
import { getUserWords } from '../../apis/words';
import { destroyWord } from '../../apis/words';
import { PatchWordForm } from "../forms/PatchWordForm";
import { Modal } from "../modals/Modal";
import { Words } from "../groups/Words";
import { Skeltons } from "../groups/Skeltons";

export const WordsOutlet = () => {
  const [userWords, setUserWords] = useState([]);
  const [patchModalIsOpen, setPatchModalIsOpen] = useState(false);
  const [patchWord, setPatchWord] = useState();
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [handleFlashMessage] = useOutletContext();

  const handleGetUserWords = async () => {
    try {
      setLoading(true)
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

  const handleClickDestroy = async (word_id) => {
    try {
      setLoading(true);
      const res = await destroyWord(word_id);
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
  }, []);

  console.log(userWords)

  return (
    <>
      {loading ? <Skeltons /> :
        userWords[0] ?
          <Words
            words={userWords}
            handleWords={handleGetUserWords}
            handleClickPatch={handleClickPatch}
            handleClickDestroy={handleClickDestroy}
            handleFlashMessage={handleFlashMessage}
          />
          :
          <p className="text-sm mt-3 p-4 bg-white rounded-sm">マイ用語がありません。</p>
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
