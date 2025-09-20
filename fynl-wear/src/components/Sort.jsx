import { useState } from "react";

const Sort = (props) => {
  const { sortValues } = props;
  const [selectedSort, setSelectedSort] = useState("");

  return (
    <select
      className="border border-[#af5cf7] rounded-sm text-[#333] text-[14px] px-1 py-1 outline-0"
      value={selectedSort}
      onChange={(e) => setSelectedSort(e.target.value)}
    >
      {sortValues?.map((each, index) => (
        <option key={index} value={each}>
          {each}
        </option>
      ))}
    </select>
  );
};

export default Sort;
