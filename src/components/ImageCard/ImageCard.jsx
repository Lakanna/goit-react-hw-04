import css from "./ImageCard.module.css";

export default function ImageCard({
  urlRegular,
  urlSmall,
  altDescription,
  description,
  likes,
  onOpenModal,
  dataForModal,
}) {
  const openModal = (urlRegular, likes, altDescription, description) => {
    dataForModal(urlRegular, likes, altDescription, description);
    onOpenModal();
  };

  return (
    <div className={css.imageItem}>
      <img
        src={urlSmall}
        alt={altDescription}
        onClick={() =>
          openModal(urlRegular, likes, altDescription, description)
        }
      />
    </div>
  );
}
