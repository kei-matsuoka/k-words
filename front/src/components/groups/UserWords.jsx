import { UserWord } from "./UserWord";

export const UserWords = ({ words }) => {
  return (
    <div className="flex flex-col items-center p-6 top-color pb-24">
      {words.map((word) => <UserWord word={word} key={word.id} />)}
    </div>
  );
}
