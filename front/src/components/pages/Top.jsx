import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { Words } from "../groups/Words";
import { fetchWords } from '../../apis/words';
import '../../index.css';

export const Top = () => {
  const [words, setWords] = useState();
  const { setLoading } = useContext(AuthContext);

  const handleFetchWords = async () => {
    try {
      const res = await fetchWords();
      if (res?.status === 200) {
        console.log(res?.words)
        setWords(res?.words)
      } else {
        console.log('no words');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleFetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      {words ? <Words words={words} /> : null}
    </>
  );
}
