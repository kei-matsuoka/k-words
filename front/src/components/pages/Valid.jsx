import { Header } from "../groups/Header";

export const Valid = () => {
  alert("アカウントが認証されました。");

  return (
    <>
      <Header/>
      <p>アカウントが認証されました。</p>      
    </>
  );
}
