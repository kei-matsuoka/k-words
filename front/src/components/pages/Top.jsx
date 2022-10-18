import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { JColumnBar } from "../groups/JColumnBar";
import { Words } from "../groups/Words";
import { getWords } from '../../apis/words';
import { escapeStringRegexp } from "../../helper";
import { reg_list } from "../../constants";

export const Top = () => {
  const [words, setWords] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { setLoading } = useContext(AuthContext);

  const handleGetWords = async () => {
    try {
      const res = await getWords();
      if (res?.status === 200) {
        setWords(res?.data);
      } else {
        console.log('no words');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
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

  const searchWords = words.filter((word) => {
    const escapedText = escapeStringRegexp(searchKeyword);
    const searchReg = new RegExp(escapedText)
    return searchReg.test(word.kana) || searchReg.test(word.title);
  });

  const handleOnClick = (num) => {
    setSearchKeyword("");
    filterWords(num);
    setFiltered(true);
  };

  const handleOnInput = (e) => {
    setSearchKeyword(e.currentTarget.value);
    setFiltered(false);
  };

  const resetWords = () => {
    setFilteredWords();
    setSearchKeyword("");
    setFiltered(false);
  };

  useEffect(() => {
    handleGetWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWords]);

  return (
    <>
      <Header
        handleGetWords={handleGetWords}
        handleOnInput={handleOnInput}
        searchKeyword={searchKeyword}
        resetWords={resetWords}
      />
      <JColumnBar handleOnClick={handleOnClick} resetWords={resetWords} />
      <div className="pt-[109px] ml-[76px] sp:ml-0 jb:pt-[150px] h-full bg-gray-50">
        {!filtered && searchWords.length !== 0 && <Words words={searchWords} />}
        {!filtered && searchWords.length === 0 && <p className="p-4">該当する用語がありません。</p>}
        {filtered && filteredWords ? <Words words={filteredWords} /> : null}
        {filtered && !filteredWords && <p className="pl-3.5 pb-3">該当する用語がありません。</p>}
      </div>
    </>
  );
}
