import { useState } from 'react';
import api from '../api/Tmdb';

export function useMovie() {
    const [movies, setMovies] = useState([]);
    const [movieDetail, setMovieDetail] = useState(null);
    const [videos, setVideos] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [loadingVideos, setLoadingVideos] = useState(false);
    const [errorVideos, setErrorVideos] = useState(null);



    async function fetchMovies(type, page = 1) {
        setLoading(true);
        try {
            const response = await api.get(`/movie/${type}`, {
                params: { page }
            });
            setMovies(response.data.results);
            setTotalPaginas(response.data.total_pages); // <-- actualizar total de páginas
        } catch (err) {
            setError("Error al cargar detalles de la película");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function paginaAnterior() {
        if (pagina > 1) setPagina(pagina - 1)
    }
    function paginaSiguiente() {
        if (pagina < totalPaginas) setPagina(pagina + 1)
    }


    async function fetchMovieDetail(id) {
        setLoading(true);
        try {
            const response = await api.get(`/movie/${id}`);
            setMovieDetail(response.data);
        } catch (err) {
            setError("No se pudo cargar la película.");
        } finally {
            setLoading(false);
        }
    }


    async function fetchVideos(id) {
        setLoadingVideos(true);
        try {
            const response = await api.get(`/movie/${id}/videos`);
            setVideos(response.data.results);
        } catch (err) {
            setErrorVideos("Error al cargar los videos");
        } finally {
            setLoadingVideos(false);
        }
    }

    return { movies, movieDetail, videos, loading, loadingVideos, error, errorVideos, pagina, totalPaginas, setPagina, paginaAnterior, paginaSiguiente, fetchMovies, fetchMovieDetail, fetchVideos };
}