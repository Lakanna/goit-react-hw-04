import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ changePage }) {
  return (
    <button className={css.btnLoadMore} onClick={changePage}>
      Load more
    </button>
  );
}
