import css from "./ImageCard.module.css";

export default function ImageCard({
  urlRegular,
  urlSmall,
  altDescription,
  likes,
}) {
  return (
    <div className={css.imageItem}>
      <img src={urlSmall} alt={altDescription} />
      <p>{urlRegular}</p>
      <p>{likes}</p>
    </div>
  );
}
