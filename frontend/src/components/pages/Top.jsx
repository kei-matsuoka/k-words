import { useState } from "react";
import Header from "../groups/Header";
import Modal from "../modals/Modal";
import SignupForm from "../forms/SignupForm";
import TopSignupButton from "../buttons/TopSignupButton";
import '../../index.css';

export default function Top() {
  const initialState = { signupModalIsOpen: false };
  const [state, setState] = useState(initialState);

  const handleClickSignup = () => {
    state.signupModalIsOpen ? setState({ signupModalIsOpen: false }) : setState({ signupModalIsOpen: true });
  };          

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-96 top-color">
        <div className="flex flex-col items-center">
          <div>
            <h2 className="text-center leading-normal text-5xl font-bold text-color">プログラミングで<br />人生の可能性を広げよう</h2>
          </div>
          <div onClick={handleClickSignup}                                                                     className='mt-14'>
            <TopSignupButton text="今すぐはじめる" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center h-72 top-color-yellow">
      </div>
      {state.signupModalIsOpen ? <Modal child={<SignupForm />} onClick={handleClickSignup} /> : null}
    </div>
  );
}
