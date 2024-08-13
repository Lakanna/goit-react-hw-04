import axios from "axios";

export default async function getPhotos(value, page = 1) {
  const URL = "https://api.unsplash.com/search/photos";
  const params = {
    client_id: "CdjgVXS8Gvc-erCPUMkWL554IwcLueiwHparrTjhEjo",
    query: value,
    per_page: 15,
    page,
  };

  return await axios.get(URL, { params });
}
