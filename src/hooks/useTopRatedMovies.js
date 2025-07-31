import { useEffect, useState } from 'react';
import api from '../api/Tmdb';

export function useTopRatedMovies() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true); // para mostrar un loader
  const [error, setError] = useState(null);

    async function fetchTopRatedMovies() {
      try {
        const response = await api.get('/movie/top_rated');
        setTopRatedMovies(response.data.results);
      } catch (err) {
        setError('Error al cargar las películas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }


  return { topRatedMovies, loading, error, fetchTopRatedMovies };
}