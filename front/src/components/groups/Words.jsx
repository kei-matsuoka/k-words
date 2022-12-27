import { Word } from "../parts/Word";

export const Words = ({ words, handleClickPatch, handleClickDestroy }) => {
  return (
    <div className="flex flex-col">
      {words.map((word) => <Word
        word={word}
        key={word.id}
        handleClickDestroy={handleClickDestroy}
        handleClickPatch={handleClickPatch} />)
      }
    </div>
  );
}
