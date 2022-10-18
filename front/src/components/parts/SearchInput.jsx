export const SearchInput = ({handleOnInput, searchKeyword}) => {
  return (
    <input
      id="search-keyword"
      type="text"
      onInput={handleOnInput}
      value={searchKeyword}
      placeholder={"検索"}
      className="border rounded-sm w-full px-2 py-1.5 shadow-inner border-gray-300"
    />
  );
}
