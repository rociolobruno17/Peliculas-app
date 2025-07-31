import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function UltimosLanzamientos() {
  const { fetchNowPlayingMovies, NowPlayingMovies, loading, error } = useNowPlayingMovies();
  const navigate = useNavigate();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

  useEffect(() => {
    fetchNowPlayingMovies();
  }, []);


  if (loading) {
    return <Typography variant="h6" align="center" mt={4}>Cargando películas...</Typography>;
  } if (error) {
    return (
      <Typography variant="h6" align="center" color="error" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ultimos Lanzamientos
      </Typography>

      <Grid container spacing={3}>
        {NowPlayingMovies.map((movie) => {
          return (
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
          );
        })}
      </Grid>
    </Box>
  );
}
