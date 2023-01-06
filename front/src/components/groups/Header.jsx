import { useState, useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { useLocation } from 'react-router-dom';
import { Dropdown } from './Dropdown';
import { SideBar } from '../groups/SideBar';
import { Modal } from "../modals/Modal";
import { SideBarModal } from '../modals/SideBarModal';
import { SearchInputModal } from '../modals/SearchInputModal';
import { WordForm } from "../forms/WordForm";
import { MdViewHeadline, MdSearch, MdAddBox } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { HeaderLogo } from '../parts/HeaderLogo';
import { SearchInput } from '../parts/SearchInput';

export const Header = ({
  handleGetWords,
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
          <MdViewHeadline size={28} className="button-gray-800" onClick={handleClickSideBar} />
          <div className="ml-6 sp:ml-2">
            <HeaderLogo resetWords={resetWords} />
          </div>
        </div>
        {path === '/' &&
          <>
            <div className='sp:hidden ml-10 w-full'>
              <SearchInput handleOnInput={handleOnInput} searchKeyword={searchKeyword} />
            </div>
            <div className='hidden sp:flex items-center'>
              <MdSearch size="22" className="button-gray-800" onClick={handleClickSearchInput} />
            </div>
          </>
        }
        <div className='flex ml-8 sp:ml-2'>
          {path === '/' &&
            <MdAddBox size="24" className="button-gray-800" onClick={handleClickWord} />
          }
          <FaUserCircle size="24" className="button-gray-800 ml-4 sp:ml-2" onClick={handleClickDropdown} />
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
        <SideBar
          handleFlashMessage={handleFlashMessage}
          handleClickLogin={handleClickLogin}
          handleClickSideBar={handleClickSideBar}
        />
      </SideBarModal>

      <div className='sp:hidden'>
        <SideBar handleFlashMessage={handleFlashMessage} handleClickLogin={handleClickLogin} />
      </div>

      <Dropdown
        handleClickSignup={handleClickSignup}
        handleClickLogin={handleClickLogin}
        handleClickDropdown={handleClickDropdown}
        handleFlashMessage={handleFlashMessage}
        isOpen={state.dropdownIsOpen}
      />
    </>
  );
}
