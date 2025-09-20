import { ButtonNoBG, ButtonBG } from "./Button";

const Pagination = (props) => {
  const { currentPage, totalPage } = props;
  const maxVisible = 3;
  const half = Math.ceil(maxVisible / 2);

  const pages = [];
  let startPage = currentPage - half;
  let endPage = currentPage + half;

  if (startPage < 1) {
    startPage = 1;
    endPage = Math.min(endPage, totalPage);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center gap-2">
      <ButtonNoBG text={"<<"} isDisabled={currentPage < 2} width="w-fit" />

      <ul className="flex justify-center items-center gap-2 flex-wrap">
        {pages.map((each) => (
          <li key={each}>
            {currentPage === each ? (
              <ButtonBG text={each} />
            ) : (
              <ButtonNoBG text={each} width="w-fit" />
            )}
          </li>
        ))}
      </ul>

      <ButtonNoBG
        text={"Next"}
        isDisabled={currentPage === totalPage}
        width="w-fit"
      />
    </div>
  );
};

export default Pagination;
