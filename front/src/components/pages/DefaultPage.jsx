import { useState, useRef, cloneElement } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../groups/Footer";
import { Header } from "../groups/Header";
import { SignupForm } from "../forms/SignupForm";
import { LoginForm } from "../forms/LoginForm";
import { TokenResetForm } from "../forms/TokenResetForm";
import { Modal } from "../modals/Modal";
import { FlashMessage } from '../parts/FlashMessage'
import { PageTitle } from "../parts/PageTitle";
import { LogoutMessage } from "../parts/LogoutMessage";

export const DefaultPage = ({ children }) => {
  const initialState = {
    signupModalIsOpen: false,
    loginModalIsOpen: false,
    passwordModalIsOpen: false,
  };

  const [title, setTitle] = useState();
  const [state, setState] = useState(initialState);
  const location = useLocation();
  const ref = useRef();

  const handleClickSignup = () => {
    setState(state.signupModalIsOpen ? { signupModalIsOpen: false } : { signupModalIsOpen: true });
  };
  const handleClickLogin = () => {
    setState(state.loginModalIsOpen ? { loginModalIsOpen: false } : { loginModalIsOpen: true });
  };
  const handleClickPassword = () => {
    setState(state.passwordModalIsOpen ? { passwordModalIsOpen: false } : { passwordModalIsOpen: true });
  };
  const handleFlashMessage = (color, message) => {
    ref.current?.stateChange(color, message)
  };
  const childrenWithProps = cloneElement(children, {
    handleFlashMessage: handleFlashMessage,
    setTitle: setTitle
  });

  return (
    <>
      <Header
        handleClickSignup={handleClickSignup}
        handleClickLogin={handleClickLogin}
        handleClickPassword={handleClickPassword}
        handleFlashMessage={handleFlashMessage}
      />
      <PageTitle title={title} />
      <div className="mt-[97px] ml-[76px] sp:ml-0 bg-gray-50 p-4">
        {childrenWithProps}
      </div>
      {location.pathname.indexOf('learning') === -1 && <Footer />}
      <FlashMessage ref={ref} />
      <LogoutMessage />

      <Modal onClick={handleClickSignup} isOpen={state.signupModalIsOpen}>
        <SignupForm
          handleClickSignup={handleClickSignup}
          handleClickLogin={handleClickLogin}
          handleFlashMessage={handleFlashMessage}
        />
      </Modal>

      <Modal onClick={handleClickLogin} isOpen={state.loginModalIsOpen}>
        <LoginForm
          handleClickSignup={handleClickSignup}
          handleClickLogin={handleClickLogin}
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
    </>
  );
}
