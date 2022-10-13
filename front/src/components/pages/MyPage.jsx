import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { UserWords } from "../groups/UserWords";
import { getUserWords } from '../../apis/users';
import { destroyWord } from '../../apis/words';
import { PatchWordForm } from "../forms/PatchWordForm";
import { Modal } from "../modals/Modal";

export const MyPage = () => {
  const [userWords, setUserWords] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
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

  const handleDestroyWord = async (id) => {
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

  const handleIsOpen = (word) => {
    if (!isOpen) {
      setIsOpen(true);
      setWord(word);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleGetUserWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserWords]);

  return (
    <>
      <Header />
      <h1>マイ用語</h1>
      {userWords ? <UserWords words={userWords}
        handleIsOpen={handleIsOpen}
        handleDestroyWord={handleDestroyWord} />
        : <p>用語がありません。</p>}
      {isOpen ? <Modal child={<PatchWordForm handleGetUserWords={handleGetUserWords} handleIsOpen={handleIsOpen} word={word} />} onClick={handleIsOpen} /> : null}
    </>
  );
}
