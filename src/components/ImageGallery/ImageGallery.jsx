import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({
  arrayOfPhotos,
  openModal,
  dataForModal,
}) {
  console.log(arrayOfPhotos);
  return (
    <ul className={css.imageList}>
      {arrayOfPhotos.map(
        ({ likes, alt_description, id, urls: { regular, small } }) => {
          return (
            <li key={id}>
              <ImageCard
                likes={likes}
                altDescription={alt_description}
                urlSmall={small}
                urlRegular={regular}
                onOpenModal={openModal}
                dataForModal={dataForModal}
              />
            </li>
          );
        }
      )}
    </ul>
  );
}
