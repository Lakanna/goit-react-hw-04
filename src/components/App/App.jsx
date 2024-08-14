import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./App.css";
import getPhotos from "../../helpers";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imgForSearch, setImgForSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchImg = (img) => setImgForSearch(img);
  const increasePage = (page) => setPage(page + 1);

  /**
    |============================
    | modal
    |============================
  */

  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataForModal, setDataForModal] = useState({});

  const dataModal = (src, likes, altDescription, description) =>
    setDataForModal({ src, likes, altDescription, description });

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  /**
    |============================
    | 
    |============================
  */

  const fetchSearchigValue = async (value, page) => {
    try {
      if (page === 1) {
        setPhotos([]);
      }
      setLoading(true);
      setError(false);

      const respons = await getPhotos(value, page);
      if (respons.data.total_pages === 0) {
        toast.error(
          "There is not photos matched your search. Try input another one, please"
        );
      }

      setTotalPages(respons.data.total_pages);
      setPhotos((prev) => {
        return prev.concat(respons.data.results);
      });
    } catch (error) {
      toast.error("Something is wrong... Try reload this page, please");
      console.log(error, "in catch");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Search photos</h1>
      <SearchBar
        onSubmit={fetchSearchigValue}
        onSearch={searchImg}
        onPage={increasePage}
      />
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery
          arrayOfPhotos={photos}
          openModal={openModal}
          dataForModal={dataModal}
        />
      )}
      {totalPages > page && (
        <LoadMoreBtn
          getPhotos={fetchSearchigValue}
          page={page}
          value={imgForSearch}
          changePage={increasePage}
        />
      )}
      {loading && <Loader />}
      <Toaster />
      {modalIsOpen && (
        <ImageModal
          dataForModal={dataForModal}
          onCloseModal={closeModal}
          openModal={openModal}
          modalIsOpen={modalIsOpen}
        />
      )}
    </>
  );
}

export default App;
