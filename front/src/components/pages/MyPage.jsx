import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { getUserWords } from '../../apis/users';
import { destroyWord } from '../../apis/words';
import { PatchWordForm } from "../forms/PatchWordForm";
import { Modal } from "../modals/Modal";
import { Words } from "../groups/Words";

export const MyPage = () => {
  const [userWords, setUserWords] = useState([]);
  const [patchModalIsOpen, setPatchModalIsOpen] = useState(false);
  const [word, setWord] = useState();
  const { setLoading, currentUser } = useContext(AuthContext);

  const handleGetUserWords = async () => {
    try {
      const res = await getUserWords(currentUser.id);
      if (res?.status === 200) {
        setUserWords(res?.words);
      } else {
        console.log('no words');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleClickDestroy = async (id) => {
    try {
      const res = await destroyWord(id);
      if (res?.status === 200) {
        handleGetUserWords();
        alert("用語が削除されました")
      } else {
        console.log('no words');
      }
    } catch (err) {
      console.log(err);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserWords]);

  return (
    <div className="bg-gray-50">
      <h1 className="p-6">マイ用語</h1>
      {userWords ? <Words words={userWords}
        handleClickPatch={handleClickPatch}
        handleClickDestroy={handleClickDestroy} />
        : <p>マイ用語がありません。</p>}
      {patchModalIsOpen ? <Modal onClick={handleClickPatch}><PatchWordForm handleGetUserWords={handleGetUserWords} handleClickPatch={handleClickPatch} word={word} /></Modal> : null}
    </div>
  );
}
