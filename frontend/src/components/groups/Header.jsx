import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../modals/Modal';
import SignupForm from '../forms/SignupForm';
import LoginForm from '../forms/LoginForm';
import HeaderSignupButton from '../buttons/HeaderSignupButton';
import HeaderLoginButton from '../buttons/HeaderLoginButton';
import logo from '../../logo.png'

export const Header = () => {
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
      <nav className='flex items-center justify-between sticky top-0 left-0 z-10 p-5 pr-8 pl-8 top-color'>
        <div>
          <Link to="/">
            <img className="h-14" src={logo} alt="ロゴ" />
          </Link>
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

      {state.signupModalIsOpen ? <Modal child={<SignupForm />} onClick={handleClickSignup} /> : null}
      {state.loginModalIsOpen ? <Modal child={<LoginForm />} onClick={handleClickLogin} /> : null}
    </>
  );
}
