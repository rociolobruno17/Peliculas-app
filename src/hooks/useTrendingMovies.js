import { useEffect, useState } from 'react';
import api from '../api/Tmdb';

export function useTrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true); // para mostrar un loader
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await api.get('/trending/movie/week');

        // Solo nos quedamos con las 5 primeras
        setTrendingMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching trending movies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return { trendingMovies, loading, error };
}
