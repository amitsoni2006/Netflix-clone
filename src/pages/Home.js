import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import Banner from '../components/Banner';
import MovieDetailsModal from '../components/MovieDetailsModal';
import {
  fetchTrending,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  searchMovies,
  fetchTrailer,
  fetchMovieDetails
} from '../services/api';

export default function Home({ user, myList, addToList, removeFromList, logout }) {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [horror, setHorror] = useState([]);
  const [romance, setRomance] = useState([]);
  const [search, setSearch] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showTrailer, setShowTrailer] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const [trendingRes, topRatedRes, actionRes, comedyRes, horrorRes, romanceRes] = await Promise.all([
      fetchTrending(),
      fetchTopRated(),
      fetchActionMovies(),
      fetchComedyMovies(),
      fetchHorrorMovies(),
      fetchRomanceMovies()
    ]);
    setTrending(trendingRes.data.results);
    setTopRated(topRatedRes.data.results);
    setAction(actionRes.data.results);
    setComedy(comedyRes.data.results);
    setHorror(horrorRes.data.results);
    setRomance(romanceRes.data.results);
  };

  const handleSearch = async (q) => {
    setSearch(q);
    if (!q.trim()) {
      loadMovies();
      return;
    }
    const res = await searchMovies(q);
    setTrending(res.data.results);
    setTopRated([]);
    setAction([]);
    setComedy([]);
    setHorror([]);
    setRomance([]);
  };

  const playTrailer = async (id) => {
    const res = await fetchTrailer(id);
    const trailer = res.data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
    if (trailer) {
      setTrailerUrl(trailer.key);
      setShowTrailer(true);
    }
  };

  const showMovieDetails = (id) => {
    setSelectedMovie(id);
    setShowDetails(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
    setTrailerUrl('');
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (section === 'home') {
      loadMovies();
    } else if (section === 'new') {
      // Show trending as new & popular
      setTrending(trending);
      setTopRated([]);
      setAction([]);
      setComedy([]);
      setHorror([]);
      setRomance([]);
    } else if (section === 'mylist') {
      // My List is handled separately
    }
  };

  const opts = {
    height: '500',
    width: '900',
    playerVars: {
      autoplay: 1,
    },
  };

  const renderContent = () => {
    if (activeSection === 'mylist') {
      return (
        <div>
          <h2 style={{ padding: '20px', color: 'white' }}>My List</h2>
          <Row title="" movies={myList} onClick={playTrailer} onInfo={showMovieDetails} onRemove={removeFromList} />
        </div>
      );
    }

    return (
      <>
        <Banner movie={trending[0]} onPlay={playTrailer} onInfo={showMovieDetails} />
        <Row title="Trending Now" movies={trending} onClick={playTrailer} onInfo={showMovieDetails} onAdd={addToList} />
        <Row title="Top Rated" movies={topRated} onClick={playTrailer} onInfo={showMovieDetails} onAdd={addToList} />
        <Row title="Action Movies" movies={action} onClick={playTrailer} onInfo={showMovieDetails} onAdd={addToList} />
        <Row title="Comedy Movies" movies={comedy} onClick={playTrailer} onInfo={showMovieDetails} onAdd={addToList} />
        <Row title="Horror Movies" movies={horror} onClick={playTrailer} onInfo={showMovieDetails} onAdd={addToList} />
        <Row title="Romance Movies" movies={romance} onClick={playTrailer} onInfo={showMovieDetails} onAdd={addToList} />
      </>
    );
  };

  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        onSearch={handleSearch}
        user={user}
        logout={logout}
        activeSection={activeSection}
        onNavClick={handleNavClick}
      />
      {renderContent()}

      {showTrailer && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <button className="close-btn" onClick={closeTrailer}>×</button>
          <div className="netflix-player">
            <div className="player-header">
              <h3>Trailer</h3>
              <div className="player-controls">
                <button className="volume-btn">🔊</button>
                <button className="fullscreen-btn">⛶</button>
              </div>
            </div>
            <YouTube
              videoId={trailerUrl}
              opts={{
                height: '500',
                width: '900',
                playerVars: {
                  autoplay: 1,
                  controls: 1,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0
                },
              }}
            />
            <div className="player-footer">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="player-actions">
                <button className="play-pause-btn">⏸️</button>
                <span className="time">0:00 / 2:30</span>
                <button className="skip-btn">⏭️</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDetails && <MovieDetailsModal movieId={selectedMovie} onClose={closeDetails} />}
    </div>
  );
}
