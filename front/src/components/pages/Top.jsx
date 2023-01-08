import { useState, useEffect, useContext, useRef } from "react";
import { AuthContext } from '../../AuthProvider';
import { JColumnBar } from "../groups/JColumnBar";
import { Header } from "../groups/Header";
import { Footer } from "../groups/Footer";
import { Words } from "../groups/Words";
import { Skeltons } from "../groups/Skeltons";
import { LogoutMessage } from "../parts/LogoutMessage";
import { FlashMessage } from "../parts/FlashMessage";
import { Modal } from "../modals/Modal";
import { TokenResetForm } from "../forms/TokenResetForm";
import { SignupForm } from "../forms/SignupForm";
import { LoginForm } from "../forms/LoginForm";
import { getWords } from "../../apis/words";
import { flash_red, reg_list } from "../../constants";
import { escapeStringRegexp, setPageTitle } from "../../helper";

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
        setWords(res?.words.sort((word, next_word) => word.kana.localeCompare(next_word.kana), 'ja'));
      } else {
        handleFlashMessage(flash_red, "用語がありません");
      }
    } catch (e) {
      console.error(e);
      handleFlashMessage(flash_red, e.message);
    }
    setLoading(false);
  };

  const filterWords = (i) => {
    const filtered_words = [];
    const reg = new RegExp(reg_list[i]);
    words.forEach((word) => {
      if (reg.test(word.kana)) {
        filtered_words.push(word);
        setFilteredWords(filtered_words.sort((word, next_word) => word.kana.localeCompare(next_word.kana), 'ja'));
      }
    });
    if (filtered_words.length === 0) {
      setFilteredWords();
    }
  };

  const searched_words = words.filter((word) => {
    const escapedText = escapeStringRegexp(searchKeyword);
    const searchReg = new RegExp(escapedText)
    return searchReg.test(word.kana) || searchReg.test(word.title);
  }).sort((word, next_word) => word.kana.localeCompare(next_word.kana), 'ja');

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
    setPageTitle("ホーム");
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
            {!filtered && ((searched_words.length !== 0) ?
              <Words
                words={searched_words}
                handleClickLogin={handleClickLogin}
                handleFlashMessage={handleFlashMessage}
                handleWords={handleGetWords}
              />
              :
              <p className="pt-2">該当する用語がありません。</p>
            )}
            {filtered && (filteredWords ?
              <Words
                words={filteredWords}
                handleClickLogin={handleClickLogin}
                handleFlashMessage={handleFlashMessage}
                handleWords={handleGetWords}
              />
              :
              <p className="pt-2">該当する用語がありません。</p>
            )}
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
