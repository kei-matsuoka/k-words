import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useLocation } from 'react-router-dom';
import { Dropdown } from './Dropdown';
import { SideBar } from '../groups/SideBar';
import { Modal } from "../modals/Modal";
import { SideBarModal } from '../modals/SideBarModal';
import { SearchInputModal } from '../modals/SearchInputModal';
import { WordForm } from "../forms/WordForm";
import { SideBarButton } from '../buttons/SideBarButton';
import { SearchButton } from '../buttons/SearchButton';
import { AddButton } from '../buttons/AddButton';
import { DropdownButton } from '../buttons/DropdownButton';
import { HeaderLogo } from '../parts/HeaderLogo';
import { SearchInput } from '../parts/SearchInput';

export const Header = ({ handleGetWords,
  handleOnInput,
  handleClickSignup,
  handleClickLogin,
  handleFlashMessage,
  searchKeyword,
  resetWords
}) => {

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
  const path = location.pathname

  const handleClickSideBar = () => {
    setState(state.sideBarIsOpen ? { sideBarIsOpen: false } : { sideBarIsOpen: true });
  };
  const handleClickSearchInput = () => {
    setState(state.searchInputIsOpen ? { searchInputIsOpen: false } : { searchInputIsOpen: true });
  };
  const handleClickDropdown = () => {
    setState(state.dropdownIsOpen ? { dropdownIsOpen: false } : { dropdownIsOpen: true });
  };
  const handleClickWord = () => {
    if (isSignedIn === true) {
      setState(state.wordModalIsOpen ? { wordModalIsOpen: false } : { wordModalIsOpen: true });
    } else {
      handleClickLogin();
      handleFlashMessage("green", "用語を追加するにはログインが必要です");
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
        {path === '/' &&
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
          {path === '/' &&
            <AddButton handleClickWord={handleClickWord} />
          }
          <DropdownButton handleClickDropdown={handleClickDropdown} />
        </div>
      </nav>

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
        <SideBar handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} handleClickSideBar={handleClickSideBar} />
      </SideBarModal>

      <div className='sp:hidden'>
        <SideBar handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} />
      </div>

      <Dropdown handleClickDropdown={handleClickDropdown} handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} handleClickSignup={handleClickSignup} isOpen={state.dropdownIsOpen} />
    </>
  );
}
