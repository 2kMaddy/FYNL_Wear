const WithoutBg = (props) => {
  return (
    <button
      type="button"
      className="w-full text-[#8a64bb] border border-[#bba3db] rounded-3xl pl-4 pr-4 p-2 hover:bg-[#8a64bb] hover:text-white hover:cursor-pointer"
    >
      {props.text}
    </button>
  );
};

export default WithoutBg;
