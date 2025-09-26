export const ButtonNoBG = ({
  text,
  isDisabled = false,
  width = "w-full",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      type="button"
      className={`${width} text-[#8a64bb] border border-[#bba3db] rounded-3xl pl-4 pr-4 p-2 hover:bg-[#8a64bb] hover:text-white hover:cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-300`}
    >
      {text}
    </button>
  );
};

export const ButtonBG = ({ text }) => {
  return (
    <button
      type="button"
      className="border border-[#bba3db] rounded-3xl pl-4 pr-4 p-2 bg-[#8a64bb] text-white cursor-pointer hover:bg-[#563b79]"
    >
      {text}
    </button>
  );
};
