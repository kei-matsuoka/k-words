import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="flex flex-col justify-center w-learn sp:w-full ml-[76px] sp:ml-0 border-t">
      <div className="flex flex-col justify-center bg-white pt-6 pb-4">
        <div className="flex jb:flex-col justify-center items-center text-sm jb:text-xs">
          <Link to={'/policy'} className="my-2 mx-3">利用規約</Link>
          <Link to={'/privacy'} className="my-2 mx-3">プライバシーポリシー</Link>
          <Link to={'/contact'} className="my-2 mx-3">お問い合わせ</Link>
          <Link to={'/about'} className="my-2 mx-3">運営情報</Link>
        </div>
        <div className="flex justify-center items-center m-4 text-xs">
          © 2023 霞が関用語辞典 All Right Reserved.
        </div>
      </div>
    </div>
  );
}
