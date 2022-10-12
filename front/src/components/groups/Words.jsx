import { Word } from "./Word";

export const Words = ({ words }) => {
  return (
    <div className="flex flex-col items-center top-color">
      {words.map((word) => <Word word={word} key={word.id} />)}
    </div>
  );
}
