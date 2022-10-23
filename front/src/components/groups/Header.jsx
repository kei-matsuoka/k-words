import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import { DropDown } from './DropDown';
import { SideBar } from '../groups/SideBar';
import { Modal } from "../modals/Modal";
import { WordForm } from "../forms/WordForm";
import { SignupForm } from '../forms/SignupForm';
import { LoginForm } from '../forms/LoginForm';
import { SignupButton } from '../buttons/SignupButton';
import { LoginButton } from '../buttons/LoginButton';
import { SideBarButton } from '../buttons/SideBarButton';
import { AddButton } from '../buttons/AddButton';
import { HeaderLogo } from '../parts/HeaderLogo';
import { SearchInput } from '../parts/SearchInput';
import { DropDownButton } from '../buttons/DropDownButton';
import { SideBarModal } from '../modals/SideBarModal';
import { SearchButton } from '../buttons/SearchButton';
import { SearchInputModal } from '../modals/SearchInputModal';
import { TokenResetForm } from '../forms/TokenResetForm';

export const Header = ({ handleGetWords, handleOnInput, searchKeyword, resetWords }) => {
  const initialState = {
    sideBarIsOpen: false,
    dropDownIsOpen: false,
    searchInputIsOpen: false,
    signupModalIsOpen: false,
    loginModalIsOpen: false,
    passwordModalIsOpen: false,
    wordModalIsOpen: false,
  };
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [state, setState] = useState(initialState);
  const location = useLocation();

  const handleClickSideBar = () => {
    setState(state.sideBarIsOpen ? { sideBarIsOpen: false } : { sideBarIsOpen: true });
  };
  const handleClickDropDown = () => {
    setState(state.dropDownIsOpen ? { dropDownIsOpen: false } : { dropDownIsOpen: true });
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
    setState(state.wordModalIsOpen ? { wordModalIsOpen: false } : { wordModalIsOpen: true });
  };

  return (
    <>
      <nav className='flex items-center justify-between fixed top-0 left-0 z-20 px-6 py-2 bg-white w-full border-b'>
        <div className='flex'>
          <SideBarButton handleClickSideBar={handleClickSideBar} />
          <div className="ml-6">
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
        {isSignedIn ?
          <div className='flex'>
            {location.pathname === '/' &&
              <AddButton handleClickWord={handleClickWord} />
            }
            <DropDownButton user={currentUser} handleClickDropDown={handleClickDropDown} />
          </div>
          :
          <div className='flex items-center'>
            <div onClick={handleClickLogin}>
              <LoginButton text="ログイン" />
            </div>
            <div onClick={handleClickSignup} className="ml-2 sb:hidden">
              <SignupButton text="新規登録" />
            </div>
          </div>
        }
      </nav>

      <Modal onClick={handleClickSignup} isOpen={state.signupModalIsOpen}>
        <SignupForm
          handleClickSignup={handleClickSignup}
          handleClickLogin={handleClickLogin}
        />
      </Modal>

      <Modal onClick={handleClickLogin} isOpen={state.loginModalIsOpen}>
        <LoginForm
          handleClickLogin={handleClickLogin}
          handleClickSignup={handleClickSignup}
          handleClickPassword={handleClickPassword}
        />
      </Modal>

      <Modal onClick={handleClickPassword} isOpen={state.passwordModalIsOpen}>
        <TokenResetForm
          handleClickPassword={handleClickPassword}
        />
      </Modal>

      {state.searchInputIsOpen &&
        <SearchInputModal handleClickSearchInput={handleClickSearchInput}>
          <SearchInput
            handleOnInput={handleOnInput}
            searchKeyword={searchKeyword}
          />
        </SearchInputModal>
      }

      <Modal onClick={handleClickWord} isOpen={state.wordModalIsOpen}>
        <WordForm
          handleGetWords={handleGetWords}
          handleClickWord={handleClickWord}
        />
      </Modal>

      {state.sideBarIsOpen &&
        <SideBarModal handleClickSideBar={handleClickSideBar}>
          <SideBar handleClickSideBar={handleClickSideBar} />
        </SideBarModal>
      }
      <div className='sp:hidden'><SideBar /></div>
      {state.dropDownIsOpen && <DropDown handleClickDropDown={handleClickDropDown} />}
    </>
  );
}
