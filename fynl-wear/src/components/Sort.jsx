import { useState } from "react";

const Sort = (props) => {
  const { sortValues, onChangeHandler, currentValue } = props;
  const [selectedSort, setSelectedSort] = useState(currentValue || "");

  // handler for controlled input
  const sortHandler = (e) => {
    setSelectedSort(e.target.value);
    onChangeHandler(e.target.value);
  };

  return (
    <select
      className="px-1 py-1 outline-0 text-[#333] text-[16px] font-semibold"
      value={selectedSort}
      onChange={sortHandler}
    >
      {sortValues?.map((each, index) => (
        <option key={index} value={each.value}>
          {each.displayText}
        </option>
      ))}
    </select>
  );
};

export default Sort;
