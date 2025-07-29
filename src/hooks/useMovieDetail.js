import { useEffect, useState } from "react";
import api from "../api/Tmdb";

export function useMovieDetail(id) {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieDetail() {
      try {
        const response = await api.get(`/movie/${id}`);
        setMovieDetail(response.data);
      } catch (err) {
        setError("No se pudo cargar la película.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetail();
  }, [id]);

  return { movieDetail, loading, error };
}