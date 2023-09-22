import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [anime, setAnime] = useState([]);

  const fetchAnimeData = async (search) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
    const data = await response.json();

    setAnime(data?.data.slice(0, 5));
  };

  useEffect(() => {
    if (searchTerm) {
      const getData = setTimeout(() => {
        fetchAnimeData(searchTerm);
      }, 400);
      return () => clearTimeout(getData);
    } else {
      setAnime([]);
    }
  }, [searchTerm]);

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-with-container">
      <div className="search-container">
        <input onChange={changeHandler} className="search" />
      </div>
      {anime &&
        anime.map((a, index) => {
          // console.log(anime?.images?.webp?.large_image_url);
          return (
            <div className="anime-list" key={index}>
              <img src={a?.images?.webp?.large_image_url} />
              <p>{a.title}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
