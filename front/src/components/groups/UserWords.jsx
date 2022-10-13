import { UserWord } from "./UserWord";

export const UserWords = ({ words, handleIsOpen , handleDestroyWord }) => {
  return (
    <div className="flex flex-col items-center top-color">
      {words.map((word) => <UserWord word={word}
        key={word.id}
        handleDestroyWord={handleDestroyWord}
        handleIsOpen={handleIsOpen} />)}
    </div>
  );
}
