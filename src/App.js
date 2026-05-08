import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import HelpCenter from './pages/HelpCenter';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [myList, setMyList] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
    const savedList = JSON.parse(localStorage.getItem('myList') || '[]');
    setMyList(savedList);
  }, []);

  const addToList = (movie) => {
    if (!myList.find(m => m.id === movie.id)) {
      const newList = [...myList, movie];
      setMyList(newList);
      localStorage.setItem('myList', JSON.stringify(newList));
    }
  };

  const removeFromList = (movieId) => {
    const newList = myList.filter(m => m.id !== movieId);
    setMyList(newList);
    localStorage.setItem('myList', JSON.stringify(newList));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup setUser={setUser} />} />
          <Route path="/account" element={user ? <Account user={user} onBack={() => window.history.back()} /> : <Navigate to="/login" />} />
          <Route path="/help" element={<HelpCenter onBack={() => window.history.back()} />} />
          <Route path="/" element={
            user ? (
              <Home
                user={user}
                myList={myList}
                addToList={addToList}
                removeFromList={removeFromList}
                logout={logout}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
