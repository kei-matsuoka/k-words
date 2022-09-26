import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import Modal from "../modals/Modal";
import SignupForm from "../forms/SignupForm";
import TopSignupButton from "../buttons/TopSignupButton";
import '../../index.css';
import { fetchAllWords } from '../../apis/words';

export default function Top() {
  const initialState = { signupModalIsOpen: false };
  const [state, setState] = useState(initialState);
  const [word, setWord] = useState();
  const { setLoading } = useContext(AuthContext);

  function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  const handleFetchAllWords = async() => {
    try {
      const res = await fetchAllWords();
      if (res?.status === 200) {
        const random_word = res?.words[getRandomInt(0,res?.words.length)];
        setWord(random_word);
      } else {
        console.log('no current user');
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  const handleClickSignup = () => {
    state.signupModalIsOpen ? setState({ signupModalIsOpen: false }) : setState({ signupModalIsOpen: true });
  };

  useEffect(() => {
    handleFetchAllWords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-6 top-color pb-24">
        <h2 className="text-5xl font-bold text-gray-600 leading-tight flex flex-col items-center mt-10">
          <div>謎に満ちた霞が関の世界へ</div>
          <div>ようこそ</div>
        </h2>
        <div onClick={handleClickSignup} className="mt-12">
          <TopSignupButton text="今すぐ始める" />
        </div>
      </div>
      <div className="flex flex-col items-center p-6 bg-gray-300">
        {word? 
        <div className="flex flex-col items-center rounded-md shadow-sm p-6 mt-16 mb-10 text-gray-600 bg-white">
          <h2 className="text-2xl font-bold underline">今日の霞が関用語</h2>
          <div className="mt-4">{word.kana}</div>
          <div className="text-2xl">{word.question}</div>
          <div className="mt-4">{word.answer}{word.text}</div>
          {/* <div>{word.text}</div> */}
        </div>
          : null }
      </div>
      {state.signupModalIsOpen ? <Modal child={<SignupForm />} onClick={handleClickSignup} /> : null}
    </>
  );
}
