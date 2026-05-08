import React, { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../services/api';

const IMG_BASE = "https://image.tmdb.org/t/p/original";

export default function Banner({ movie, onPlay, onInfo }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (movie) {
      fetchMovieDetails(movie.id).then(res => setDetails(res.data));
    }
  }, [movie]);

  if (!movie) return null;

  const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str;

  return (
    <div className="banner" style={{ backgroundImage: `url(${IMG_BASE}${movie.backdrop_path})` }}>
      <div className="banner-content">
        <h1 className="banner-title">{movie.title || movie.name}</h1>
        <p className="banner-description">{truncate(details?.overview, 150)}</p>
        <button className="play-btn" onClick={() => onPlay(movie.id)}>▶ Play</button>
        <button className="info-btn" onClick={() => onInfo(movie.id)}>ℹ More Info</button>
      </div>
    </div>
  );
}