import { useLocation } from 'react-router-dom';
import { DestroyButton } from '../buttons/DestroyButton';
import { PatchButton } from '../buttons/PatchButton';

export const Word = ({ word, handleClickPatch, handleClickDestroy }) => {
  const location = useLocation();
  const handleOnClickDestroy = () => {
    handleClickDestroy(word.id);
  };
  const handleOnClickPatch = () => {
    handleClickPatch(word);
  };

  return (
    <article className='flex flex-col w-full px-8 py-6 mb-3 bg-white relative shadow rounded-sm'>
      {location.pathname !== '/' &&
        <div className='flex absolute top-4 right-6'>
          <div className='mr-1'><PatchButton handleOnClickPatch={handleOnClickPatch} /></div>
          <div><DestroyButton handleOnClickDestroy={handleOnClickDestroy} /></div>
        </div>
      }
      <h1 className="mb-1">{word.title}</h1>
      <div className="w-5/6 text-sm">
        <p>{word.meaning}</p>
        <p>{word.text}</p>
      </div>
      {location.pathname === '/' &&
        <p className='text-xs absolute bottom-4 right-6'>@{word.user.name}</p>
      }
    </article>
  );
}
