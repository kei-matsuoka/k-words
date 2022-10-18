import { Header } from "../groups/Header";

export const DefaultPage = ({children}) => {
  return (
    <>
      <Header/>
      <div className="mt-[61px] ml-[76px] sp:ml-0">{children}</div>
    </>
  );
}
