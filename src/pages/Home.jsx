// src/pages/Home.jsx
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { useMovie } from "../hooks/useMovie"; // ✅ nuevo hook unificado
import {
  Box,
  Typography,
  Grid
} from "@mui/material";

export default function Home() {
  const navigate = useNavigate();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);

  // 👉 Usamos el mismo hook con diferentes instancias

  const {
    movies: trendingMovies,
    loading,
    fetchMovies: fetchTrending
  } = useMovie();


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
    fetchTrending("now_playing");
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
      <Hero movies={trendingMovies} loading={loading} />

      {/* 🌟 Películas Mejor Puntuadas */}
      <section>
        <Typography variant="h4" gutterBottom mt={6}>
          🌟 Películas Mejor Puntuadas
        </Typography>

        <Grid container spacing={3}>
          {topRatedMovies.slice(0, 10).map((movie) => {
            return (

              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <MovieCard
                  movie={movie}
                  esFavorito={esFavorito}
                  toggleFavorito={toggleFavorito}
                />
              </Grid>
            )
          }
          )}
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
                <MovieCard
                  movie={movie}
                  esFavorito={esFavorito}
                  toggleFavorito={toggleFavorito}
                />
              </Grid>
            )
          }
          )}
        </Grid>
      </section>
    </Box >
  );
}
