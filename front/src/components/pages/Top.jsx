import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { JColumnBar } from "../groups/JColumnBar";
import { Words } from "../groups/Words";
import { getWords } from '../../apis/words';
import { escapeStringRegexp } from "../../helper";
import { reg_list } from "../../constants";
import { MdAddCircle } from 'react-icons/md';
import { Modal } from "../modals/Modal";
import { WordForm } from "../forms/WordForm";

export const Top = () => {
  const [words, setWords] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { setLoading, isSignedIn } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

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

  const handleIsOpen = () => {
    if (isSignedIn) {
      setIsOpen(isOpen ? false : true);
    } else {
      alert("ログインしてください")
    }
  };

  useEffect(() => {
    handleGetWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWords]);

  return (
    <>
      <Header handleOnInput={handleOnInput} searchKeyword={searchKeyword} resetWords={resetWords} />
      <JColumnBar resetWords={resetWords} handleOnClick={handleOnClick} />
      {!filtered && searchWords.length !== 0 && <Words words={searchWords} />}
      {!filtered && searchWords.length === 0 && <p>用語がありません。</p>}
      {filtered && filteredWords && <Words words={filteredWords} />}
      {filtered && !filteredWords && <p>用語がありません。</p>}
      <button onClick={handleIsOpen}>
        <MdAddCircle size="60" className="text-gray-600 fixed right-6 bottom-6 z-10 hover:text-gray-800 drop-shadow-md duration-300" />
      </button>
      {isOpen ? <Modal child={<WordForm handleGetWords={handleGetWords} handleIsOpen={handleIsOpen} />} onClick={handleIsOpen} /> : null}
    </>
  );
}
