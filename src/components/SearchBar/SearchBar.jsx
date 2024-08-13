import toast from "react-hot-toast";

export default function SearchBar({ onSubmit, onSearch, onPage }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formValue = form.elements.search.value.trim();

    if (formValue === "") {
      toast.error("Please, input value for search");
      return;
    }
    onSearch(formValue);
    onSubmit(formValue, 1);
    onPage(1);
    form.reset();
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
