import { ButtonBG, ButtonNoBG } from "./Button";

const Popup = ({ message, onClose, onClick }) => {
  return (
    <div className="fixed w-full h-[80%] flex justify-center items-center">
      <div className="bg-white rounded-2xl p-8 w-fit">
        <h1 className="font-semibold text-xl text-center mb-4">{message}</h1>
        <div className="flex flex-1/2 justify-between items-center gap-2">
          <ButtonBG
            text={"Confirm"}
            onClick={() => {
              onClick();
              onClose();
            }}
            width="w-full"
          />
          <ButtonNoBG text={"Cancel"} onClick={() => onClose()} />
        </div>
      </div>
    </div>
  );
};

export default Popup;
