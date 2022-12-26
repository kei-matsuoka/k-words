import { Word } from "./Word";

export const Words = ({ words, handleClickPatch, handleClickDestroy }) => {
  return (
    <div className="flex flex-col px-4 py-1 w-full">
      {words.map((word) => <Word
        word={word}
        key={word.id}
        handleClickDestroy={handleClickDestroy}
        handleClickPatch={handleClickPatch} />)
      }
    </div>
  );
}
