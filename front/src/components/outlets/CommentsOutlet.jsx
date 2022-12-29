import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { useOutletContext } from "react-router-dom";
import { getCommentedWords } from '../../apis/comments';
import { Words } from "../groups/Words";

export const CommentsOutlet = () => {
  const [commentedWords, setCommentedWords] = useState([]);
  const { setLoading, currentUser } = useContext(AuthContext);
  const [handleFlashMessage] = useOutletContext();

  // 重複を取り除く処理
  const filterWords = (words) => {
    const result = words.filter((element, index, self) =>
      self.findIndex(word => word.id === element.id) === index
    );
    return result;
  };

  const handleGetCommentedWords = async () => {
    try {
      const res = await getCommentedWords(currentUser.id);
      if (res?.status === 200) {
        const filtered_words = filterWords(res.words);
        setCommentedWords(filtered_words);
      } else {
        console.log(res.message);
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetCommentedWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCommentedWords]);

  return (
    <>
      {commentedWords[0] ?
        <Words words={commentedWords} handleWords={handleGetCommentedWords} handleFlashMessage={handleFlashMessage} />
        :
        <p className="text-white text-sm mt-3">お気に入りの用語がありません。</p>
      }
    </>
  );
}
