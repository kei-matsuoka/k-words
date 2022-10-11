import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { UserWords } from "../groups/UserWords";
import { getUserWords } from '../../apis/users';

export const MyPage = () => {
  const [userWords, setUserWords] = useState([]);
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

  useEffect(() => {
    handleGetUserWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUserWords]);

  return (
    <>
      <Header />
      <h1>マイ用語</h1>
      {userWords ? <UserWords words={userWords} /> : <p>用語がありません。</p>}
    </>
  );
}
