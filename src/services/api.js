import axios from 'axios';

const API_KEY = "94fd558cc98a248a8e69a0d727340bbf";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = () =>
  axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

export const fetchTopRated = () =>
  axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);

export const fetchActionMovies = () =>
  axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`);

export const fetchComedyMovies = () =>
  axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`);

export const fetchHorrorMovies = () =>
  axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`);

export const fetchRomanceMovies = () =>
  axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`);

export const searchMovies = (query) =>
  axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);

export const fetchTrailer = (id) =>
  axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);

export const fetchMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

export const fetchMovieCredits = (id) =>
  axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
