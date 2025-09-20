import { useState } from "react";

const Sort = (props) => {
  const { sortValues } = props;
  const [selectedSort, setSelectedSort] = useState("");

  return (
    <select
      className="px-1 py-1 outline-0 text-[#333] text-[16px] font-semibold"
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
