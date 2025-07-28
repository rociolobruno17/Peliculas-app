// src/hooks/usePopularMovies.js
import { useEffect, useState } from 'react';
import api from '../api/Tmdb';

export function usePopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // para mostrar un loader
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await api.get('/movie/popular');
        setMovies(response.data.results);
      } catch (err) {
        setError('Error al cargar las películas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPopularMovies();
  }, []);

  return { movies, loading, error };
}
