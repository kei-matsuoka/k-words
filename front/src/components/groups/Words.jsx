import { useLocation } from "react-router-dom";
import { Word } from "./Word";

export const Words = ({ words, handleClickPatch, handleClickDestroy }) => {
  const location = useLocation();
  return (
    <div className="flex flex-col px-4 py-1">
      {location.pathname === '/' ?
        <>
          {words.map((word) => <Word
            word={word}
            key={word.id}
          />)}
        </>
        :
        <>
          {words.map((word) => <Word
            word={word}
            key={word.id}
            handleClickDestroy={handleClickDestroy}
            handleClickPatch={handleClickPatch} />)
          }
        </>
      }
    </div>
  );
}
