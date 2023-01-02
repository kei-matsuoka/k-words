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
import { Footer } from "../groups/Footer";
import { Modal } from "../modals/Modal";
import { SignupForm } from "../forms/SignupForm";
import { LoginForm } from "../forms/LoginForm";
import { TokenResetForm } from "../forms/TokenResetForm";
import { Skeltons } from "../groups/Skeltons";

export const Top = () => {
  const initialState = {
    signupModalIsOpen: false,
    loginModalIsOpen: false,
    passwordModalIsOpen: false,
  };

  const { loading, setLoading } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(20);
  const [filtered, setFiltered] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const ref = useRef();

  const handleClickSignup = () => {
    setState(state.signupModalIsOpen ? { signupModalIsOpen: false } : { signupModalIsOpen: true });
  };
  const handleClickLogin = () => {
    setState(state.loginModalIsOpen ? { loginModalIsOpen: false } : { loginModalIsOpen: true });
  };
  const handleClickPassword = () => {
    setState(state.passwordModalIsOpen ? { passwordModalIsOpen: false } : { passwordModalIsOpen: true });
  };
  const handleFlashMessage = (color, message) => {
    ref.current?.stateChange(color, message)
  };

  const handleGetWords = async () => {
    try {
      setLoading(true);
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
    words.forEach((word) => {
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

  useEffect(() => {
    handleGetWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setWords]);

  return (
    <>
      <Header
        handleGetWords={handleGetWords}
        handleOnInput={handleOnInput}
        handleClickSignup={handleClickSignup}
        handleClickLogin={handleClickLogin}
        handleClickPassword={handleClickPassword}
        handleFlashMessage={handleFlashMessage}
        searchKeyword={searchKeyword}
        resetWords={resetWords}
      />
      <JColumnBar handleOnClick={handleOnClick} resetWords={resetWords} index={index} />
      <div className="mt-[94px] ml-[76px] p-4 sp:ml-0 jb:mt-[142px] h-full bg-gray-50">
        {loading ? <Skeltons /> :
          <>
            {!filtered && (searchWords.length !== 0) &&
              <Words
                words={searchWords}
                handleClickLogin={handleClickLogin}
                handleFlashMessage={handleFlashMessage}
                handleWords={handleGetWords}
              />
            }
            {filtered && filteredWords &&
              <Words
                words={filteredWords}
                handleClickLogin={handleClickLogin}
                handleFlashMessage={handleFlashMessage}
                handleWords={handleGetWords}
              />
            }
            {!filtered && searchWords.length === 0 && <p className="pt-2">該当する用語がありません。</p>}
            {filtered && !filteredWords && <p className="pt-2">該当する用語がありません。</p>}
          </>
        }
      </div>
      <Footer />
      <FlashMessage ref={ref} />
      <LogoutMessage />

      <Modal onClick={handleClickSignup} isOpen={state.signupModalIsOpen}>
        <SignupForm
          handleClickSignup={handleClickSignup}
          handleClickLogin={handleClickLogin}
          handleFlashMessage={handleFlashMessage}
        />
      </Modal>

      <Modal onClick={handleClickLogin} isOpen={state.loginModalIsOpen}>
        <LoginForm
          handleClickLogin={handleClickLogin}
          handleClickSignup={handleClickSignup}
          handleClickPassword={handleClickPassword}
          handleFlashMessage={handleFlashMessage}
        />
      </Modal>

      <Modal onClick={handleClickPassword} isOpen={state.passwordModalIsOpen}>
        <TokenResetForm
          handleClickPassword={handleClickPassword}
          handleFlashMessage={handleFlashMessage}
        />
      </Modal>
    </>
  );
}
