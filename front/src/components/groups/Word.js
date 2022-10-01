export const Word = ({word}) => {
  return (
    <div className='flex flex-col items-center w-1/2 p-6 m-2 rounded-md border bg-white'>
      <div>{word.kana}</div>
      <div>{word.title}</div>
      <div className='mt-3 text-sm'>{word.meaning}</div>
      <div className='mt-3 text-sm'>{word.text}</div>
    </div>
  );
}
