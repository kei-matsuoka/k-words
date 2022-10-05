import { j_column_list } from "../../constants";

export const JColumnBar = ({resetWords,handleOnClick}) => {
  return (
    <ul className="flex">
      <li className="border" onClick={resetWords}><a>全て</a></li>
      {j_column_list.map((column) =>
        <li key={j_column_list.indexOf(column)}>
          <a onClick={() => handleOnClick(j_column_list.indexOf(column))}>{column}</a>
        </li>)}
    </ul>
  );
}
