import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { Dropdown } from './Dropdown';
import { SideBar } from '../groups/SideBar';
import { Modal } from "../modals/Modal";
import { WordForm } from "../forms/WordForm";
import { SignupForm } from '../forms/SignupForm';
import { LoginForm } from '../forms/LoginForm';
import { SideBarButton } from '../buttons/SideBarButton';
import { AddButton } from '../buttons/AddButton';
import { HeaderLogo } from '../parts/HeaderLogo';
import { SearchInput } from '../parts/SearchInput';
import { DropdownButton } from '../buttons/DropdownButton';
import { SideBarModal } from '../modals/SideBarModal';
import { SearchButton } from '../buttons/SearchButton';
import { SearchInputModal } from '../modals/SearchInputModal';
import { TokenResetForm } from '../forms/TokenResetForm';

export const Header = ({ handleGetWords, handleOnInput, handleFlashMessage, searchKeyword, resetWords }) => {
  const initialState = {
    sideBarIsOpen: false,
    dropdownIsOpen: false,
    searchInputIsOpen: false,
    signupModalIsOpen: false,
    loginModalIsOpen: false,
    passwordModalIsOpen: false,
    wordModalIsOpen: false,
  };
  const { isSignedIn } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const location = useLocation();

  const handleClickSideBar = () => {
    setState(state.sideBarIsOpen ? { sideBarIsOpen: false } : { sideBarIsOpen: true });
  };
  const handleClickDropdown = () => {
    setState(state.dropdownIsOpen ? { dropdownIsOpen: false } : { dropdownIsOpen: true });
  };
  const handleClickSearchInput = () => {
    setState(state.searchInputIsOpen ? { searchInputIsOpen: false } : { searchInputIsOpen: true });
  };
  const handleClickSignup = () => {
    setState(state.signupModalIsOpen ? { signupModalIsOpen: false } : { signupModalIsOpen: true });
  };
  const handleClickLogin = () => {
    setState(state.loginModalIsOpen ? { loginModalIsOpen: false } : { loginModalIsOpen: true });
  };
  const handleClickPassword = () => {
    setState(state.passwordModalIsOpen ? { passwordModalIsOpen: false } : { passwordModalIsOpen: true });
  };
  const handleClickWord = () => {
    if (isSignedIn === true) {
      setState(state.wordModalIsOpen ? { wordModalIsOpen: false } : { wordModalIsOpen: true });
    } else {
      setState(state.loginModalIsOpen ? { loginModalIsOpen: false } : { loginModalIsOpen: true });
      state.loginModalIsOpen === false && handleFlashMessage("green", "用語を追加するにはログインが必要です");
    }
  };

  return (
    <>
      <nav className='flex items-center justify-between fixed top-0 left-0 z-20 px-6 py-2 bg-white w-full h-[57px] border-b'>
        <div className='flex'>
          <SideBarButton handleClickSideBar={handleClickSideBar} />
          <div className="ml-6 sp:ml-2">
            <HeaderLogo resetWords={resetWords} />
          </div>
        </div>
        {location.pathname === '/' &&
          <>
            <div className='sp:hidden ml-10 mr-4 w-full'>
              <SearchInput handleOnInput={handleOnInput} searchKeyword={searchKeyword} />
            </div>
            <div className='hidden sp:flex items-center'>
              <SearchButton handleClickSearchInput={handleClickSearchInput} />
            </div>
          </>
        }
        <div className='flex'>
          {location.pathname === '/' &&
            <AddButton handleClickWord={handleClickWord} />
          }
          <DropdownButton handleClickDropdown={handleClickDropdown} />
        </div>
      </nav>

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

      <SearchInputModal onClick={handleClickSearchInput} isOpen={state.searchInputIsOpen}>
        <SearchInput
          handleOnInput={handleOnInput}
          searchKeyword={searchKeyword}
        />
      </SearchInputModal>

      <Modal onClick={handleClickWord} isOpen={state.wordModalIsOpen}>
        <WordForm
          handleGetWords={handleGetWords}
          handleClickWord={handleClickWord}
          handleFlashMessage={handleFlashMessage}
        />
      </Modal>

      <SideBarModal onClick={handleClickSideBar} isOpen={state.sideBarIsOpen}>
        <SideBar handleClickSideBar={handleClickSideBar} handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} />
      </SideBarModal>

      <div className='sp:hidden'>
        <SideBar handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} />
      </div>

      <Dropdown handleClickDropdown={handleClickDropdown} handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} handleClickSignup={handleClickSignup} isOpen={state.dropdownIsOpen} />
    </>
  );
}
