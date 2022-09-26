export const Word = (props) => {
  return (
    <div className="flex flex-col justify-center relative h-64 border bg-white">
      <div className="absolute right-0 h-64 w-1/2 hover:cursor-pointer" onClick={props.onClick.handleRightClick}></div>
      <div className="absolute left-0 h-64 w-1/2 hover:cursor-pointer" onClick={props.onClick.handleLeftClick}></div>
      <div className='flex flex-col items-center relative'>
        {props.word.id % 2 === 0 ?
          <div className="text-3xl">{props.word.title}</div>
          : <>
            <div className="text-3xl text-red-500">{props.word.title}</div>
            <div className="absolute top-14 text-red-500">{props.word.text}</div>
          </>
        }
      </div>
    </div>
  );
}
