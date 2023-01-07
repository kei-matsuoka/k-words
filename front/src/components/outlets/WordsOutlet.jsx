import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Words } from "../groups/Words";
import { Skeltons } from "../groups/Skeltons";
import { getUserWords } from '../../apis/words';
import { flash_red } from "../../constants";

export const WordsOutlet = () => {
  const [userWords, setUserWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [handleFlashMessage] = useOutletContext();

  const handleGetUserWords = async () => {
    try {
      setLoading(true)
      const res = await getUserWords();
      if (res?.status === 200) {
        setUserWords(res.words);
      } else {
        console.log(res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetUserWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Skeltons /> :
        userWords[0] ?
          <Words
            words={userWords}
            handleWords={handleGetUserWords}
            handleFlashMessage={handleFlashMessage}
          />
          :
          <p className="text-sm mt-3 p-4 bg-white rounded-sm">マイ用語がありません。</p>
      }

    </>
  );
}
