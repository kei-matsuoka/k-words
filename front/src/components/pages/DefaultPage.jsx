import { useRef, cloneElement } from "react";
import { Header } from "../groups/Header";
import { FlashMessage } from '../parts/FlashMessage'

export const DefaultPage = ({ children }) => {
  const ref = useRef();
  const handleFlashMessage = (color, message) => {
    ref.current?.stateChange(color, message)
  };
  const childrenWithProps = cloneElement(children, { handleFlashMessage: handleFlashMessage });

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-[57px] ml-[76px] sp:ml-0 bg-gray-50 p-4">{childrenWithProps}</div>
      <FlashMessage ref={ref} />
    </>
  );
}
