import React from 'react';
import MovieCard from './MovieCard';

export default function Row({ title, movies, onClick, onInfo, onAdd, onRemove }) {
  return (
    <div className="row">
      {title && <h2 className="row-title">{title}</h2>}
      <div className="row-posters">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={onClick} onInfo={onInfo} onAdd={onAdd} onRemove={onRemove} />
        ))}
      </div>
    </div>
  );
}
