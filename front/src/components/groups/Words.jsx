import { Word } from "./Word";

export const Words = ({ words }) => {
  return (
    <div className="flex flex-col items-center p-6 top-color pb-24">
      {words.map((word) => <Word word={word} key={word.id} />)}
    </div>
  );
}
