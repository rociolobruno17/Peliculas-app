// src/hooks/useMovies.js
import { useState } from 'react';
import api from '../api/Tmdb';

export function useMovie() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchMovies(type) {
    setLoading(true);
    try {
      const response = await api.get(`/movie/${type}`);
      setMovies(response.data.results);
    } catch (err) {
      setError("Error al cargar películas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { movies, loading, error, fetchMovies };
}
