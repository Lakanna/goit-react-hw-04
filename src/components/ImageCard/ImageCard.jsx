import css from "./ImageCard.module.css";

export default function ImageCard({
  urlRegular,
  urlSmall,
  altDescription,
  likes,
  onOpenModal,
  dataForModal,
}) {
  const openModal = (urlRegular, likes) => {
    console.log(dataForModal);
    console.log(urlRegular, "urlRegular in imgcard");
    dataForModal(urlRegular, likes);
    onOpenModal();
  };

  return (
    <div className={css.imageItem}>
      <img
        src={urlSmall}
        alt={altDescription}
        onClick={() => openModal(urlRegular, likes)}
      />
      <p>{urlRegular}</p>
      <p>{likes}</p>
    </div>
  );
}
