export const SearchInput = ({handleOnInput, searchKeyword}) => {
  return (
    <input
      className="border rounded-sm w-full sp:w-[200px] px-2 py-1.5 shadow-inner border-gray-300"
      id="search-keyword"
      type="text"
      onInput={handleOnInput}
      value={searchKeyword}
      placeholder={"検索"}
    />
  );
}
