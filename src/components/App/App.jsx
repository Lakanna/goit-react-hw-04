import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./App.css";
import getPhotos from "../../helpers";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imgForSearch, setImgForSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [modalIsOpen, setIsOpen] = useState(false);

  const searchImg = (img) => setImgForSearch(img);
  const increasePage = (page) => setPage(page + 1);

  /**
    |============================
    | modal
    |============================
  */

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataForModal, setDataForModal] = useState({});

  const dataModal = (src, alt) => setDataForModal({ src, alt });

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
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
    console.log(page, "in fetch");
    try {
      if (page === 1) {
        setPhotos([]);
      }
      setLoading(true);
      setError(false);

      const respons = await getPhotos(value, page);
      console.log(respons.data.total_pages);
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
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          dataForModal={dataForModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          {console.log(dataForModal, "in modal dataforModal")};
          <img src={dataForModal.src} alt={dataForModal.alt} width={300} />
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
        </Modal>
      </div>
    </>
  );
}

export default App;
