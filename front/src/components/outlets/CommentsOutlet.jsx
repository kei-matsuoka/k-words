import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { getCommentedWords } from '../../apis/words';
import { Words } from "../groups/Words";
import { Skeltons } from "../groups/Skeltons";
import { flash_red } from "../../constants";

export const CommentsOutlet = () => {
  const [commentedWords, setCommentedWords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [handleFlashMessage] = useOutletContext();

  // コメントした用語から重複を取り除く
  const filterWords = (words) => {
    const result = words.filter((element, index, self) =>
      self.findIndex(word => word.id === element.id) === index
    );
    return result;
  };

  const handleGetCommentedWords = async () => {
    try {
      setLoading(true);
      const res = await getCommentedWords();
      if (res?.status === 200) {
        const filtered_words = filterWords(res.words.sort((word, next_word) => word.kana.localeCompare(next_word.kana), 'ja'));
        setCommentedWords(filtered_words);
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
    handleGetCommentedWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? <Skeltons /> : commentedWords[0] ?
        <Words
          words={commentedWords}
          handleWords={handleGetCommentedWords}
          handleFlashMessage={handleFlashMessage}
        />
        :
        <p className="text-sm mt-3 p-4 bg-white rounded-sm">コメントした用語がありません。</p>
      }
    </>
  );
}
