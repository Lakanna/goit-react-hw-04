import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ page, getPhotos, value, changePage }) {
  const pageForChange = page;
  const valueForSearch = value;
  const clickBtn = (page, value) => {
    changePage(page);
    getPhotos(value, page);
  };

  return (
    <button
      className={css.btnLoadMore}
      onClick={() => clickBtn(pageForChange, valueForSearch)}
    >
      Load more
    </button>
  );
}
