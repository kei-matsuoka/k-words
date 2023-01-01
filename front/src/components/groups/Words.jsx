import { Word } from "../parts/Word";

export const Words = ({
  words,
  handleClickPatch,
  handleClickDestroy,
  handleClickLogin,
  handleFlashMessage,
  handleWords
}) => {
  return (
    <div className="flex flex-col">
      {words.map((word) => <Word
        key={word.id}
        word={word}
        handleClickDestroy={handleClickDestroy}
        handleClickPatch={handleClickPatch}
        handleClickLogin={handleClickLogin}
        handleFlashMessage={handleFlashMessage}
        handleWords={handleWords}
      />)}
    </div>
  );
}
