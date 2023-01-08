import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getFavoriteWords } from '../../apis/words';
import { Words } from "../groups/Words";
import { Skeltons } from "../groups/Skeltons";
import { flash_red } from "../../constants";

export const FavoritesOutlet = () => {
  const [favoriteWords, setFavoriteWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [handleFlashMessage] = useOutletContext();

  const handleGetFavoriteWords = async () => {
    try {
      setLoading(true);
      const res = await getFavoriteWords();
      if (res?.status === 200) {
        setFavoriteWords(res.words.sort((word, next_word) => word.kana.localeCompare(next_word.kana), 'ja'));
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
    handleGetFavoriteWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Skeltons /> : favoriteWords[0] ?
        <Words
          words={favoriteWords}
          handleWords={handleGetFavoriteWords}
          handleFlashMessage={handleFlashMessage}
        />
        :
        <p className="text-sm mt-3 p-4 bg-white rounded-sm">お気に入りの用語がありません。</p>
      }
    </>
  );
}
