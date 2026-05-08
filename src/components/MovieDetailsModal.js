import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchMovieCredits } from '../services/api';

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieDetailsModal({ movieId, onClose }) {
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    if (movieId) {
      Promise.all([
        fetchMovieDetails(movieId),
        fetchMovieCredits(movieId)
      ]).then(([detailsRes, creditsRes]) => {
        setDetails(detailsRes.data);
        setCredits(creditsRes.data);
      });
    }
  }, [movieId]);

  if (!details) return null;

  const cast = credits?.cast?.slice(0, 10) || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-header" style={{ backgroundImage: `url(${IMG_BASE}${details.backdrop_path})` }}>
          <div className="modal-title">
            <h1>{details.title}</h1>
            <div className="modal-meta">
              <span>{details.release_date?.split('-')[0]}</span>
              <span>{details.runtime} min</span>
              <span>{details.genres?.map(g => g.name).join(', ')}</span>
            </div>
          </div>
        </div>
        <div className="modal-body">
          <p className="modal-overview">{details.overview}</p>
          <div className="modal-cast">
            <h3>Cast</h3>
            <div className="cast-list">
              {cast.map(actor => (
                <div key={actor.id} className="cast-item">
                  <img src={actor.profile_path ? `${IMG_BASE}${actor.profile_path}` : 'https://via.placeholder.com/80x80?text=No+Image'} alt={actor.name} />
                  <p>{actor.name}</p>
                  <p className="character">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-info">
            <p><strong>Director:</strong> {credits?.crew?.find(c => c.job === 'Director')?.name}</p>
            <p><strong>Rating:</strong> {details.vote_average}/10</p>
            <p><strong>Language:</strong> {details.original_language}</p>
          </div>
        </div>
      </div>
    </div>
  );
}