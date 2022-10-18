import { j_column_list } from "../../constants";

export const JColumnBar = ({ resetWords, handleOnClick }) => {
  return (
    <ul className="flex flex-wrap fixed top-[57px] left-0 z-10 bg-white w-full shadow-sm ml-[76px] sp:ml-0">
      <li>
        <button
          onClick={resetWords}
          className="w-10 h-10 hover:bg-gray-100 duration-100 border-r border-b"
        >All</button>
      </li>
      {j_column_list.map((column) =>
        <li key={j_column_list.indexOf(column)}>
          <button
            onClick={() => handleOnClick(j_column_list.indexOf(column))}
            className="w-10 h-10 hover:bg-gray-100 duration-100 border-r border-b"
          >{column}</button>
        </li>)}
    </ul>
  );
}
