import { useState } from 'react';
import SignUpModal from '../modals/SignUpModal';

export default function Header() {
  const initialState = { isOpen: false };
  const [state, setState] = useState(initialState);

  const handleClick = () => {
    state.isOpen ? setState({ isOpen: false }) : setState({ isOpen: true });
  };

  return (
    <header>
      <a href="#">CodeFlash</a>
      <div>
        <ul>
          <li><a href="#">ログイン</a></li>
          <li onClick={handleClick}>無料会員登録</li>
        </ul>
      </div>
      {state.isOpen ? <SignUpModal /> : ""}
    </header>
  );
}
