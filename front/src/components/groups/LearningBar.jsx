import { Link } from "react-router-dom";

export const LearningBar = ({ id, title, handleOnClick }) => {
  return (
    <div className="flex justify-between items-center fixed top-[61px] left-[76px] sp:left-0 border-b w-learn sp:w-full h-10 bg-white shadow-sm">
      <Link to={`/cards/${id}`}>＜</Link>
      <div>{title}</div>
      <button>設定</button>
    </div>
  );
}
