export const LearningWord = ({ title, handleOnClick }) => {
  return (
    <>
      <div
        className="absolute right-0 w-1/2 h-96 hover:cursor-pointer"
        onClick={() => handleOnClick(1)}>
      </div>
      <div
        className="absolute left-0 w-1/2 h-96 hover:cursor-pointer"
        onClick={() => handleOnClick(-1)}>
      </div>
      <div className="flex justify-center items-center shadow absolute left-0 -z-10 w-full h-96 text-4xl bg-white">
        <div className="px-10">{title}</div>
      </div>
    </>
  );
}
