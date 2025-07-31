import { useState } from 'react';
import api from '../api/Tmdb';

export function useNowPlayingMovies() {
  const [NowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

    async function fetchNowPlayingMovies() {
      try {
        const response = await api.get('movie/now_playing');

        setNowPlayingMovies(response.data.results);
      } catch (error) {
        console.error("Error al cargar ultimos lanzamientos", error);
      } finally {
        setLoading(false);
      }
    };

  return { NowPlayingMovies, loading, error, fetchNowPlayingMovies };
}
