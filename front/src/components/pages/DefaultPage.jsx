import { useState, useRef, cloneElement } from "react";
import { useLocation } from "react-router-dom";
import { Footer } from "../groups/Footer";
import { Header } from "../groups/Header";
import { FlashMessage } from '../parts/FlashMessage'
import { PageTitle } from "../parts/PageTitle";

export const DefaultPage = ({ children }) => {
  const ref = useRef();
  const [title, setTitle] = useState();
  const location = useLocation();
  const handleFlashMessage = (color, message) => {
    ref.current?.stateChange(color, message)
  };
  const childrenWithProps = cloneElement(children, { handleFlashMessage: handleFlashMessage, setTitle: setTitle });

  return (
    <>
      <Header />
      <PageTitle title={title} />
      <div className="mt-[97px] ml-[76px] sp:ml-0 bg-gray-50 p-4">{childrenWithProps}</div>
      <FlashMessage ref={ref} />
      {location.pathname.indexOf('learning') === -1 && <Footer />}
    </>
  );
}
