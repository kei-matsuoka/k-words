export const LearningWord = ({ word_id, state, handleOnClick }) => {
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
      <div className="absolute flex justify-center items-center shadow -z-10 w-full h-96 text-3xl bg-white">
        <div className="px-10">{state.words[word_id].title}</div>
      </div>
      <div className="absolute flex justify-center items-end w-full h-96 -z-10 -top-2 text-sm">{(word_id + 1) + "/" + state.length}</div>
    </>
  );
}
