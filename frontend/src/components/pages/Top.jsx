import { useState } from "react";
import Header from "../groups/Header";
import TopSignupButton from "../buttons/TopSignupButton";
import '../../index.css';
import SignupModal from "../modals/SignupModal";

export default function Top() {
  const initialState = { signupModalIsOpen: false };
  const [state, setState] = useState(initialState);

  const handleClickSignup = () => {
    state.signupModalIsOpen ? setState({ signupModalIsOpen: false }) : setState({ signupModalIsOpen: true });
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center">
          <div>
            <h2 className="text-center leading-normal text-4xl font-bold">プログラミングで<br />人生の可能性を広げよう</h2>
          </div>
          <div onClick={handleClickSignup} className='mt-8'>
            <TopSignupButton text="今すぐ始める" />
          </div>
        </div>
      </div>
      {state.signupModalIsOpen ? <SignupModal /> : null}
    </div>
  );
}
