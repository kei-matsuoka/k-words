export const Word = ({ word }) => {
  return (
    <div className='flex flex-col w-11/12 p-6 m-2 rounded-md border bg-white'>
      <div className='mt-3 text-sm'>{word.title}</div>
      <div className='mt-3 text-sm'>{word.meaning}</div>
      <div className='mt-3 text-sm'>{word.text}</div>
      <div className='mt-3 text-sm'>@{word.user.name}さん</div>
    </div>
  );
}
