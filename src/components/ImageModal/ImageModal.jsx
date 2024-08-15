import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

export default function ImageModal({
  dataForModal,
  onCloseModal,
  modalIsOpen,
}) {
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onCloseModal}
        dataForModal={dataForModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <img src={dataForModal.src} alt={dataForModal.altDescription} />

        <div className={css.describe}>
          <p>{dataForModal.description}</p>
          <p>Likes : {dataForModal.likes}</p>
        </div>
        <button onClick={onCloseModal}>close</button>
      </Modal>
    </>
  );
}
