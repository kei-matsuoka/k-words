import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { FlashMessage } from "../parts/FlashMessage";

export const DefaultPage = ({children}) => {
  const { flashMessage } = useContext(AuthContext);
  return (
    <>
      <Header/>
      <div className="flex flex-col items-center mt-[57px] ml-[76px] sp:ml-0 bg-gray-50 p-4">{children}</div>
      {flashMessage.message && <FlashMessage />}
    </>
  );
}
