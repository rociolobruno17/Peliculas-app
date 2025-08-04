// src/pages/Home.jsx
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Hero from "../components/Hero";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { useMovie } from "../hooks/useMovie"; // ✅ nuevo hook unificado
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function Home() {
  const navigate = useNavigate();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

  // 👉 Usamos el mismo hook con diferentes instancias
  const {
    movies: topRatedMovies,
    fetchMovies: fetchTopRated
  } = useMovie();

  const {
    movies: popularMovies,
    fetchMovies: fetchPopular
  } = useMovie();

  // 🔄 Fetchs individuales por tipo
  useEffect(() => {
    fetchTopRated("top_rated");
    fetchPopular("popular");
  }, []);

  const imgPath = "https://image.tmdb.org/t/p/w500";

  const responsiveFull = {
    all: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <Box sx={{ padding: 0 }}>
      {/* 🔥 Películas en Tendencia */}
          <Hero />

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
