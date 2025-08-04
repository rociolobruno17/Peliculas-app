// src/pages/Populares.jsx
import { useNavigate } from "react-router";
import { useMovie } from "../hooks/useMovie"; // ✅ nuevo hook unificado
import { useContext, useEffect } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Stack, Pagination } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Populares() {
  const navigate = useNavigate();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

  // 👉 Usamos el mismo hook con diferentes instancias
  const {
    movies: popularMovies,
    loading,
    error,
    fetchMovies: fetchPopularMovies,
    pagina,
    totalPaginas,
    paginaAnterior,
    paginaSiguiente,
    setPagina
  } = useMovie();

  useEffect(() => {
    fetchPopularMovies('popular', pagina);
  }, [pagina]);

  const handleChange = (event, value) => {
    setPagina(value); // cuando clickean en un número
  };


  return (
    <Box sx={{ padding: 4, pt:12 }}>

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
          popularMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                sx={{ height: "100%", cursor: "pointer", position: "relative" }}
                onClick={() => navigate(`/detail/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                  }
                  alt={movie.title}
                  sx={{ height: 350, objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    {movie.title}
                  </Typography>
                </CardContent>

                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // ⚠️ evita que se dispare el onClick del Card
                      toggleFavorito({
                        id: movie.id,
                        title: movie.title,
                        image: movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                      });
                    }}
                    aria-label="Agregar a favoritos"
                  >
                    {esFavorito(movie.id)
                      ? <FavoriteIcon color="error" />
                      : <FavoriteBorderIcon sx={{ color: "white" }} />}
                  </IconButton>

                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      
      <Stack spacing={2} alignItems="center" mt={4}>
        <Pagination
          count={totalPaginas > 500 ? 500 : totalPaginas} // TMDB no permite más de 500 páginas
          page={pagina}
          onChange={handleChange}
          color="primary"
        />
      </Stack>

    </Box>
  );
}
