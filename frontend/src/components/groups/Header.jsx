import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignupModal from '../modals/SignupModal';
import LoginModal from '../modals/LoginModal';
import HeaderSignupButton from '../buttons/HeaderSignupButton';
import HeaderLoginButton from '../buttons/HeaderLoginButton';

export default function Header() {
  const initialState = { signupModalIsOpen: false, loginModalIsOpen: false };
  const [state, setState] = useState(initialState);

  const handleClickSignup = () => {
    state.signupModalIsOpen ? setState({ signupModalIsOpen: false }) : setState({ signupModalIsOpen: true });
  };
  const handleClickLogin = () => {
    state.loginModalIsOpen ? setState({ loginModalIsOpen: false }) : setState({ loginModalIsOpen: true });
  };

  return (
    <>
      <nav className='flex items-center justify-between bg-white p-6'>
        <div className="font-bold">
          <Link to="/">CodeFlash</Link>
        </div>
        <div className='flex'>
          <div onClick={handleClickLogin} className="mr-2">
            <HeaderLoginButton text="ログイン" />
          </div>
          <div onClick={handleClickSignup}>
            <HeaderSignupButton text="無料会員登録" />
          </div>
        </div>
      </nav>

      {state.signupModalIsOpen ? <SignupModal /> : null}
      {state.loginModalIsOpen ? <LoginModal /> : null}
    </>
  );
}
