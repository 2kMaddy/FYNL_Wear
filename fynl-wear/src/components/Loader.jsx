import { BeatLoader } from "react-spinners";

export const PrimaryLoader = ({ size = "20" }) => {
  return (
    <div className="fixed mt-[65px] inset-0 z-50 bg-white pointer-events-auto min-h-[80%] flex justify-center items-center w-full">
      <BeatLoader
        color="#4c3669"
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
