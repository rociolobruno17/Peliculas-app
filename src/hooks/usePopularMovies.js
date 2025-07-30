// src/hooks/usePopularMovies.js
import { useState } from 'react';
import api from '../api/Tmdb';

export function usePopularMovies() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true); // para mostrar un loader
  const [error, setError] = useState(null);

    async function fetchPopularMovies() {
      try {
        const response = await api.get('/movie/popular');
        setPopularMovies(response.data.results);
      } catch (err) {
        setError('Error al cargar las películas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

  return { popularMovies, loading, error, fetchPopularMovies };
}
