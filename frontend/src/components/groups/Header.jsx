import { useState } from 'react';
import SignupModal from '../modals/SignupModal';
import LoginModal from '../modals/LoginModal';

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
    <header>
      <a href="/">CodeFlash</a>
      <div>
        <ul>
          <li onClick={handleClickLogin}>ログイン</li>
          <li onClick={handleClickSignup}>無料会員登録</li>
        </ul>
      </div>
      {state.signupModalIsOpen ? <SignupModal /> : ""}
      {state.loginModalIsOpen ? <LoginModal /> : ""}
    </header>
  );
}
