import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { getUserWords } from '../../apis/users';
import { destroyWord } from '../../apis/words';
import { PatchWordForm } from "../forms/PatchWordForm";
import { Modal } from "../modals/Modal";
import { Words } from "../groups/Words";

export const MyPage = ({handleFlashMessage}) => {
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

  // const handleFlashMessage = (color, message) => {
  //   ref.current?.stateChange(color, message)
  // }

  useEffect(() => {
    handleGetUserWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserWords]);

  return (
    <>
      <h1 className="p-6">マイ用語</h1>
      {userWords ? <Words words={userWords}
        handleClickPatch={handleClickPatch}
        handleClickDestroy={handleClickDestroy} />
        : <p>マイ用語がありません。</p>}
      {patchModalIsOpen && <Modal onClick={handleClickPatch} isOpen={patchModalIsOpen}><PatchWordForm handleGetUserWords={handleGetUserWords} handleClickPatch={handleClickPatch} handleFlashMessage={handleFlashMessage} word={word} /></Modal>}
    </>
  );
}
