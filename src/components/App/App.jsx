import { useState } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchSearchigValue = async (value) => {
    try {
      setPhotos([]);
      setLoading(true);
      setError(false);
      const respons = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=CdjgVXS8Gvc-erCPUMkWL554IwcLueiwHparrTjhEjo&query=${value}`
      );
      setPhotos(respons.data.results);
    } catch (error) {
      console.log(error, "in catch");
      setError(true);
    } finally {
      setLoading(false);
    }

    console.log(photos, "photos in APP");
  };

  return (
    <>
      <h1>Search photos</h1>
      <SearchBar onSubmit={fetchSearchigValue} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {photos.length > 0 && <ImageGallery arrayOfPhotos={photos} />}
      <Toaster />
    </>
  );
}

export default App;
