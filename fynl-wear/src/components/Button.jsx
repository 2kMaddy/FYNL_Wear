import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
      className={`${width} text-[12px] md:text-[16px] text-[#8a64bb] border border-[#bba3db] rounded-3xl pl-4 pr-4 p-2 hover:bg-[#8a64bb] hover:text-white hover:cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed disabled:border-gray-300`}
    >
      {text}
    </button>
  );
};

export const ButtonBG = ({
  text,
  width = "w-fit",
  btnType = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={btnType}
      className={`${width} text-[13px] md:text-[16px] border border-[#bba3db] rounded-3xl pl-4 pr-4 p-2 bg-[#664a8b] text-white cursor-pointer hover:bg-[#563b79]`}
    >
      {text}
    </button>
  );
};

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="font-semibold text-2xl cursor-pointer"
    >
      <IoMdArrowBack />
    </button>
  );
};
