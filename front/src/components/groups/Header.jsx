import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Link } from 'react-router-dom';
import { Dropdown } from './Dropdown';
import Modal from '../modals/Modal';
import SignupForm from '../forms/SignupForm';
import LoginForm from '../forms/LoginForm';
import HeaderSignupButton from '../buttons/HeaderSignupButton';
import HeaderLoginButton from '../buttons/HeaderLoginButton';

export const Header = () => {
  const initialState = { signupModalIsOpen: false, loginModalIsOpen: false };
  const [state, setState] = useState(initialState);
  const { isSignedIn } = useContext(AuthContext);

  const handleClickSignup = () => {
    state.signupModalIsOpen ? setState({ signupModalIsOpen: false }) : setState({ signupModalIsOpen: true });
  };
  const handleClickLogin = () => {
    state.loginModalIsOpen ? setState({ loginModalIsOpen: false }) : setState({ loginModalIsOpen: true });
  };

  return (
    <>
      <nav className='flex items-center justify-between sticky top-0 left-0 z-10 p-5 pr-8 pl-8 bg-white shadow-sm'>
        <Link to="/" className='font-bold text-gray-600'>霞が関用語辞典</Link>
        { isSignedIn ? <Dropdown /> : 
          <div className='flex'>
            <div onClick={handleClickLogin} className="mr-2">
              <HeaderLoginButton text="ログイン" />
            </div>
            <div onClick={handleClickSignup}>
              <HeaderSignupButton text="新規登録" />
            </div>
          </div>
        }
      </nav>

      {state.signupModalIsOpen ? <Modal child={<SignupForm handleClickSignup={handleClickSignup} />} onClick={handleClickSignup} /> : null}
      {state.loginModalIsOpen ? <Modal child={<LoginForm handleClickLogin={handleClickLogin} />} onClick={handleClickLogin} /> : null}
    </>
  );
}
