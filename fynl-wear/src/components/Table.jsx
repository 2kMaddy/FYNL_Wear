import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Table = ({ headers, data }) => {
  return (
    <table className="w-full max-w-7xl text-sm text-left rtl:text-right border border-gray-200 bg-white rounded-lg overflow-hidden">
      <thead className="text-xs uppercase bg-purple-700 text-white rounded-t-lg">
        <tr>
          {headers.map((header, index) => (
            <th
              scope="col"
              className={`px-6 py-3 ${
                index === 0
                  ? "rounded-tl-lg"
                  : index === headers.length - 1
                  ? "rounded-tr-lg"
                  : ""
              }`}
              key={index}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr className="border-b border-gray-200" key={rowIndex}>
            {row?.map((cell, cellIndex) =>
              cell?.startsWith("http") ? (
                <td className="px-6 py-4" key={cellIndex}>
                  <img
                    src={cell}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
              ) : cell?.includes("Edit" || "Delete") ? (
                <td className="py-4 px-6 text-[18px]" key={cellIndex}>
                  <button
                    type="button"
                    className="mr-6 hover:text-purple-600 cursor-pointer"
                  >
                    <FaRegEdit />
                  </button>
                  <button
                    type="button"
                    className="hover:text-red-600 cursor-pointer"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              ) : (
                <td className="px-6 py-4" key={cellIndex}>
                  {cell}
                </td>
              )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
