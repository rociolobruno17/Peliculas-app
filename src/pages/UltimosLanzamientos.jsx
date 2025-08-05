// src/pages/UltimosLanzamientos.jsx
import { useMovie } from "../hooks/useMovie";
import { useContext, useEffect } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Box, Typography, Grid, Stack, Pagination } from "@mui/material";
import MovieCard from "../components/MovieCard"; // ✅ Importá tu componente card
import Hero from "../components/Hero";

export default function UltimosLanzamientos() {
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

  const {
    movies: nowPlayingMovies,
    loading,
    error,
    fetchMovies: fetchNowPlayingMovies,
    pagina,
    totalPaginas,
    setPagina
  } = useMovie();

  useEffect(() => {
    fetchNowPlayingMovies('upcoming', pagina);
  }, [pagina]);

  const handleChange = (event, value) => {
    setPagina(value);
  };

  return (
    <Box sx={{ padding: 0 }}>

      <Hero movies={nowPlayingMovies}
      loading={loading}
      subtitulo="Próximos estrenos para agendar."
      />

      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="h6" align="center" mt={4} sx={{ width: '100%' }}>
            Cargando películas...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error" mt={4} sx={{ width: '100%' }}>
            {error}
          </Typography>
        ) : (
          nowPlayingMovies.map((movie) => (
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
