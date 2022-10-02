import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { Words } from "../groups/Words";
import { fetchWords } from '../../apis/words';
import '../../index.css';

export const Top = () => {
  const [words, setWords] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const { setLoading } = useContext(AuthContext);
  const aiueo = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"]
  const reg_list = ["^あ|^い|^う|^え|^お|^ぁ|^ぃ|^ぅ|^ぇ|^ぉ",
    "^か|^き|^け|^こ|^が|^ぎ|^ぐ|^げ|^ご",
    "^さ|^し|^す|^せ|^そ|^ざ|^じ|^ず|^ぜ|^ぞ",
    "^た|^ち|^つ|^て|^と|^だ|^ぢ|^づ|^で|^ど",
    "^な|^に|^ぬ|^ね|^の",
    "^は|^ひ|^ふ|^へ|^ほ|^ば|^び|^ぶ|^べ|^ぼ",
    "^ま|^み|^む|^め|^も",
    "^や|^ゆ|^よ",
    "^ら|^り|^る|^れ|^ろ",
    "^わ|^を|^ん"];

  const handleFetchWords = async () => {
    try {
      const res = await fetchWords();
      if (res?.status === 200) {
        setWords(res?.words);
        console.log(res?.words);
      } else {
        console.log('no words');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const handleOnClick = (num) => {
    filterWords(num);
    setFiltered(true);
  };

  const filterWords = (num) => {
    const array = [];
    const reg = new RegExp(reg_list[num]);
    words.map((word) => {
      if (reg.test(word.kana)) {
        array.push(word);
        setFilteredWords(array);
      }
    });
    if (array.length === 0) {
      setFilteredWords();
    }
  };

  useEffect(() => {
    handleFetchWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <ul className="flex">
        <li className="border" onClick={() => setFiltered(false)}><a>全て</a></li>
        {aiueo.map((row) =>
          <li key={aiueo.indexOf(row)}>
            <a onClick={() => handleOnClick(aiueo.indexOf(row))}>{row}</a>
          </li>)}
      </ul>
      {!filtered ? <Words words={words} /> :
        filteredWords ? <Words words={filteredWords} /> : <p>用語がありません。</p>}
    </>
  );
}
