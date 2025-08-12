// hooks/useSearchMovies.js
import { useState } from 'react';
import api from '../api/Tmdb';

export function useSearchMovies() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function searchMovies(query) {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.get('/search/movie', {
        params: {
          query,
          include_adult: false,
          page: 1
        }
      });
      setResults(response.data.results.slice(0, 20));
    } catch (err) {
      setError('Error al buscar películas');
    } finally {
      setLoading(false);
    }
  }

  return { results, loading, error, searchMovies };
}
