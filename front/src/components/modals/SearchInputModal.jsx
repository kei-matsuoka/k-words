export const SearchInputModal = ({children, handleClickSearchInput}) => {
  return (
    <div
      className="fixed top-0 z-30 left-0 w-full h-full" 
      onClick={handleClickSearchInput}>
      <div
        className="bg-white rounded-sm absolute drop-shadow top-[9px] left-1/3 z-20"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
