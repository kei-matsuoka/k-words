import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { JColumnBar } from "../groups/JColumnBar";
import { Words } from "../groups/Words";
import { escapeStringRegexp } from "../../helper";
import { reg_list } from "../../constants";
import { FlashMessage } from "../parts/FlashMessage";
import { LogoutMessage } from "../parts/LogoutMessage";
import { getWords } from "../../apis/words";

export const Top = () => {
  const [words, setWords] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { setLoading } = useContext(AuthContext);
  const [index, setIndex] = useState(20);
  const ref = useRef();

  const handleGetWords = async () => {
    try {
      const res = await getWords();
      if (res?.status === 200) {
        setWords(res?.words);
      } else {
        handleFlashMessage("red", "用語がありません");
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage("red", e.message);
    }
    setLoading(false);
  };

  const filterWords = (i) => {
    const array = [];
    const reg = new RegExp(reg_list[i]);
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

  const handleOnClick = (i) => {
    setIndex(i);
    setSearchKeyword("");
    setFiltered(true);
    filterWords(i);
  };

  const handleOnInput = (e) => {
    setSearchKeyword(e.currentTarget.value);
    setIndex(20);
    setFiltered(false);
  };

  const resetWords = () => {
    setIndex(20);
    setFilteredWords();
    setSearchKeyword("");
    setFiltered(false);
  };

  const handleFlashMessage = (color, message) => {
    ref.current?.stateChange(color, message)
  }

  useEffect(() => {
    handleGetWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWords]);

  return (
    <>
      <Header
        handleGetWords={handleGetWords}
        handleOnInput={handleOnInput}
        handleFlashMessage={handleFlashMessage}
        searchKeyword={searchKeyword}
        resetWords={resetWords}
      />
      <JColumnBar handleOnClick={handleOnClick} resetWords={resetWords} index={index} />
      <div className="pt-[116px] ml-[76px] sp:ml-0 jb:pt-[166px] h-full bg-gray-50">
        {!filtered && searchWords.length !== 0 && <Words words={searchWords} />}
        {!filtered && searchWords.length === 0 && <p className="pl-3.5 pb-3.5">該当する用語がありません。</p>}
        {filtered && filteredWords && <Words words={filteredWords} />}
        {filtered && !filteredWords && <p className="pl-3.5 pb-3.5">該当する用語がありません。</p>}
      </div>
      <FlashMessage ref={ref} />
      <LogoutMessage />
    </>
  );
}
