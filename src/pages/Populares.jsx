// src/pages/Populares.jsx
import { useNavigate } from "react-router";
import { useMovie } from "../hooks/useMovie";
import { useContext, useEffect } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import {
  Box,
  Typography,
  Grid,
  Stack,
  Pagination
} from "@mui/material";
import MovieCard from "../components/MovieCard"; // 👉 Importamos tu componente nuevo
import Hero from "../components/Hero";

export default function Populares() {
  const navigate = useNavigate();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

  const {
    movies: popularMovies,
    loading,
    error,
    fetchMovies: fetchPopularMovies,
    pagina,
    totalPaginas,
    setPagina
  } = useMovie();

  useEffect(() => {
    fetchPopularMovies('popular', pagina);
  }, [pagina]);

  const handleChange = (event, value) => {
    setPagina(value);
  };

  return (
    <Box sx={{ padding: 0 }}>

      <Hero
        movies={popularMovies}
        loading={loading}
        subtitulo="Lo más visto del momento. Dale play a lo que todos están hablando."
      />
      <Grid container spacing={2} padding={6} >
        {loading ? (
          <Typography variant="h6" align="center" mt={4} sx={{ width: '100%' }}>
            Cargando películas...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error" mt={4} sx={{ width: '100%' }}>
            {error}
          </Typography>
        ) : (
          popularMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <MovieCard
                movie={movie}
                esFavorito={esFavorito}
                toggleFavorito={toggleFavorito}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Stack spacing={2} alignItems="center" mt={4}>
        <Pagination
          count={totalPaginas > 500 ? 500 : totalPaginas}
          page={pagina}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  );
}
