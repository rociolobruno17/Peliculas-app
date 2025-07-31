// src/pages/Home.jsx
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Home() {
  const { trendingMovies, loading, fetchTrendingMovies } = useTrendingMovies();
  const { popularMovies, fetchPopularMovies } = usePopularMovies();
  const { topRatedMovies, fetchTopRatedMovies } = useTopRatedMovies();
  const navigate = useNavigate();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

    useEffect(() => {
    fetchTrendingMovies();
  }, []);

    useEffect(() => {
    fetchTopRatedMovies();
  }, []);

    useEffect(() => {
      fetchPopularMovies();
    }, []);

  const imgPath = "https://image.tmdb.org/t/p/w500";

  return (
    <Box sx={{ padding: 4 }}>
      {/* 🔥 Películas en Tendencia */}
      <section>
        <Typography variant="h4" gutterBottom>
          🔥 Películas en Tendencia
        </Typography>
        {loading ? (
          <Typography variant="h6" align="center" mt={4}>
            Cargando películas...
          </Typography>
        ) : (
            // {trendingMovies.slice(0, 5).map((movie) => (
          
      <Grid container spacing={3}>
        {trendingMovies.slice(0, 5).map((movie) => {
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
        )}
      </section>

      {/* 🌟 Películas Mejor Puntuadas */}
      <section>
        <Typography variant="h4" gutterBottom mt={6}>
          🌟 Películas Mejor Puntuadas
        </Typography>

      <Grid container spacing={3}>
        {topRatedMovies.slice(0, 10).map((movie) => {
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
      </section>

      {/* 🎬 Películas Populares */}
      <section>
        <Typography variant="h4" gutterBottom mt={6}>
          🎬 Películas Populares
        </Typography>
        
      <Grid container spacing={3}>
        {popularMovies.slice(0, 10).map((movie) => {
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
      </section>
    </Box>
  );
}
