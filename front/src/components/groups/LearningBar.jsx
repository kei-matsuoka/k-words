import { Link } from "react-router-dom";

export const LearningBar = ({ url, title, handleOnClick }) => {
  return (
    <div className="flex justify-between items-center fixed top-[57px] left-[76px] sp:left-0 border-b w-learn sp:w-full h-10 bg-white z-10">
      <div className="ml-4 text-sm">
        <Link to={url}>戻る</Link>
      </div>
      <div className="mb-0.5">{title}</div>
      <div className="mr-4 text-sm">
        <div>　　</div>
      </div>
    </div>
  );
}
