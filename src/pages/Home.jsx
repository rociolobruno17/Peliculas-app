// src/pages/Home.jsx
import Carousel from "react-multi-carousel";
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

  const responsiveCards = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1200 },
      items: 5,
    },
    laptop: {
      breakpoint: { max: 1200, min: 900 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <Box sx={{ padding: 0 }}>
      {/* 🔥 Películas en Tendencia */}
      <Hero movies={trendingMovies}
        loading={loading}
        subtitulo="¿Qué se estrena esta semana?"
      />

      <section>
        <Typography variant="h5" gutterBottom mt={6}>
         Películas Mejor Puntuadas
        </Typography>

        <Carousel
          responsive={responsiveCards}
          infinite={false}
          arrows
          draggable
          swipeable
          keyBoardControl
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
        >
          {topRatedMovies.slice(0, 10).map((movie) => (
            <Box key={movie.id} sx={{ px: 1 }}>
              <MovieCard
                movie={movie}
                esFavorito={esFavorito}
                toggleFavorito={toggleFavorito}
              />
            </Box>
          ))}
        </Carousel>
      </section>

      {/* 🎬 Películas Populares */}
      <section>
        <Typography variant="h5" gutterBottom mt={6}>
        Películas Populares
        </Typography>

        <Carousel
          responsive={responsiveCards}
          infinite={false}
          arrows
          draggable
          swipeable
          keyBoardControl
          itemClass="carousel-item-padding-40-px"
          containerClass="carousel-container"
        >
          {popularMovies.slice(0, 10).map((movie) => (
            <Box key={movie.id} sx={{ px: 1 }}>
              <MovieCard
                movie={movie}
                esFavorito={esFavorito}
                toggleFavorito={toggleFavorito}
              />
            </Box>
          ))}
        </Carousel>
      </section>
    </Box >
  );
}
