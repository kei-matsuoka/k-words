import { useState } from 'react';
import SignupForm from '../modals/SignupForm';

function Header() {
  const [state, setState] = useState({isOpen: false});
  return(
    <header class="site-header">
      <a href="#" class="brand">CodeFlash</a>
      <nav class="nav">
        <ul class="nav__wrapper">
          <li class="nav__item"><a href="#">ログイン</a></li>
          <li class="nav__item" onClick={() => setState({isOpen: true})}>無料会員登録</li>
        </ul>
      </nav>
      { state.isOpen && <SignupForm/> }
    </header>
  );
}

export default Header;
