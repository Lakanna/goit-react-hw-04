import { useEffect, useState } from "react";
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataForModal, setDataForModal] = useState({});

  useEffect(() => {
    if (imgForSearch === "") {
      return;
    }

    const fetchSearchigValue = async (imgForSearch, page) => {
      try {
        setLoading(true);
        setError(false);

        const respons = await getPhotos(imgForSearch, page);
        if (respons.data.total_pages === 0) {
          toast.error(
            "There is not photos matched your search. Try input another one, please"
          );
        }

        console.log(respons.data.total_pages, "respons.data.total_pages fetch");
        setTotalPages(respons.data.total_pages);
        setPhotos((prev) => [...prev, ...respons.data.results]);
      } catch (error) {
        toast.error("Something is wrong... Try reload this page, please");
        console.log(error, "in catch");
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchigValue(imgForSearch, page);
  }, [imgForSearch, page]);

  const searchImg = (img) => setImgForSearch(img);

  const dataModal = (src, likes, altDescription, description) =>
    setDataForModal({ src, likes, altDescription, description });

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (imgForSearch) => {
    searchImg(imgForSearch);
    setPhotos([]);
  };

  const loadMore = async () => {
    setPage(page + 1);
  };

  return (
    <>
      <h1>Search photos</h1>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {photos.length > 0 && (
        <ImageGallery
          arrayOfPhotos={photos}
          openModal={openModal}
          dataForModal={dataModal}
        />
      )}
      {page < totalPages && <LoadMoreBtn changePage={loadMore} />}
      {loading && <Loader />}
      <Toaster />
      {modalIsOpen && (
        <ImageModal
          dataForModal={dataForModal}
          onCloseModal={closeModal}
          modalIsOpen={modalIsOpen}
        />
      )}
    </>
  );
}

export default App;
