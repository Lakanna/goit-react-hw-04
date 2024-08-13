export default function LoadMoreBtn({ page, getPhotos, value, changePage }) {
  const pageForChange = page;
  const valueForSearch = value;
  const clickBtn = (page, value) => {
    console.log(page);
    changePage(page);
    getPhotos(value, page);
  };

  return (
    <button onClick={() => clickBtn(pageForChange, valueForSearch)}>
      Load more
    </button>
  );
}
