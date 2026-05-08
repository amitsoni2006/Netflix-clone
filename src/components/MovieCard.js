import React from 'react';

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie, onClick, onInfo, onAdd, onRemove }) {
  const isInList = onRemove ? true : false; // If onRemove is passed, it's in My List

  return (
    <div className="movie-card">
      <img src={`${IMG_BASE}${movie.poster_path}`} alt={movie.title} onClick={() => onClick(movie.id)} />
      <div className="movie-card-overlay">
        <button className="play-small-btn" onClick={() => onClick(movie.id)}>▶</button>
        <button className="info-small-btn" onClick={() => onInfo(movie.id)}>ℹ</button>
        {onAdd && <button className="add-btn" onClick={() => onAdd(movie)}>+</button>}
        {onRemove && <button className="remove-btn" onClick={() => onRemove(movie.id)}>×</button>}
      </div>
      <p>{movie.title}</p>
    </div>
  );
}
