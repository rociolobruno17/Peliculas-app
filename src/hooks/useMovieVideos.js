// src/hooks/useMovieVideos.js
import { useEffect, useState } from 'react';
import api from '../api/Tmdb';

export function useMovieVideos(movieId) {
    const [movieVideos, setMovieVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchMovieVideos() {
            try {
                const response = await api.get(`movie/${movieId}/videos`);
                setMovieVideos(response.data.results);
            } catch (err) {
                setError('Error al cargar los videos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        if (movieId) fetchMovieVideos();
    }, [movieId]);

    return { movieVideos, loading, error };
}
