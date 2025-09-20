import { FaSearch } from "react-icons/fa";

const SearchBar = (props) => {
  const { placeHolder, searchFunc, onChangeFunc } = props;
  return (
    <div className="w-full flex flex-row items-center gap-4 border border-[#bba3db] rounded-3xl pl-4 pr-4 p-2">
      <input
        type="search"
        placeholder={placeHolder}
        className="w-full outline-0 text-[#333] font-semibold"
        onChange={(e) => onChangeFunc(e.target.value)}
      />
      <button type="button" onClick={searchFunc}>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
