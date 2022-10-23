import { Link } from "react-router-dom";

export const LearningBar = ({ id, title, handleOnClick }) => {
  return (
    <div className="flex justify-between items-center fixed top-[57px] left-[76px] sp:left-0 border-b w-learn sp:w-full h-10 bg-white shadow-sm">
      <div className="ml-4 text-sm">
        <Link to={`/cards/${id}`}>戻る</Link>
      </div>
      <div>{title}</div>
      <div className="mr-4 text-sm">
        <button>設定</button>
      </div>
    </div>
  );
}
