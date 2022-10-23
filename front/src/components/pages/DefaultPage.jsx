import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Header } from "../groups/Header";
import { FlashMessage } from "../parts/FlashMessage";

export const DefaultPage = ({children}) => {
  const { flashMessage } = useContext(AuthContext);
  return (
    <>
      <Header/>
      <div className="mt-[61px] ml-[76px] sp:ml-0">{children}</div>
      {flashMessage.message && <FlashMessage />}
    </>
  );
}
