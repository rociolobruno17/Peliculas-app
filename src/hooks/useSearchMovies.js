import { useState, useEffect } from 'react';
import api from '../api/Tmdb';

export function useSearchMovies(query) { //Este hook recibe como parámetro el texto de búsqueda (query) que escribe el usuario.
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function searchMovies() {
      if (!query) { // si query está vacío, no hace la búsqueda
        setResults([]); // Cada vez que el usuario cambia el query, se ejecuta este efecto.
        return;
      }

      setLoading(true);
      try {
        const response = await api.get('/search/movie', {
          params: {  //Usamos params para pasar el query como parte de la URL (?query=nombrePelicula).
            query,
            include_adult: false, // opcional
            page: 1
          },
          signal: controller.signal
        });
        setResults(response.data.results.slice(0, 20)); // Guardamos los primeros 20 resultados
      } catch (err) {
        if (err.name !== 'CanceledError') {
          setError('Error al buscar películas');
        }
      } finally {
        setLoading(false);
      }
    }

    searchMovies();

    return () => controller.abort(); // Limpia al desmontar o cambiar query
  }, [query]);

  return { results, loading, error };
}
