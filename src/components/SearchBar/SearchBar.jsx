import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formValue = form.elements.search.value.trim();

    if (formValue === "") {
      toast.error("Please, input value for search");
      return;
    }
    console.log(formValue, "form value in search");
    onSubmit(formValue);

    form.reset();
  }

  return (
    <section className={css.searchSection}>
      <form onSubmit={handleSubmit} className={css.searchform}>
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
