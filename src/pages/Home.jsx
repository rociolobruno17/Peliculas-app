// src/pages/Home.jsx
import { useNavigate } from "react-router";
import { useTrendingMovies } from "../hooks/useTrendingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function Home() {
  const { trendingMovies, loading } = useTrendingMovies();
  const { popularMovies } = usePopularMovies();
  const { topRatedMovies } = useTopRatedMovies();
  const navigate = useNavigate();

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
          <Grid container spacing={3}>
            {trendingMovies.slice(0, 5).map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/detail/${movie.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={
                      movie.poster_path
                        ? `${imgPath}${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                    }
                    alt={movie.title}
                    sx={{ height: 350, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ⭐ {movie.vote_average}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.overview.length > 150
                        ? movie.overview.slice(0, 150) + "..."
                        : movie.overview}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </section>

      {/* 🌟 Películas Mejor Puntuadas */}
      <section>
        <Typography variant="h4" gutterBottom mt={6}>
          🌟 Películas Mejor Puntuadas
        </Typography>
        <Grid container spacing={3}>
          {topRatedMovies.slice(0, 10).map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                sx={{ height: "100%", cursor: "pointer" }}
                onClick={() => navigate(`/detail/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? `${imgPath}${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                  }
                  alt={movie.title}
                  sx={{ height: 350, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>

      {/* 🎬 Películas Populares */}
      <section>
        <Typography variant="h4" gutterBottom mt={6}>
          🎬 Películas Populares
        </Typography>
        <Grid container spacing={3}>
          {popularMovies.slice(0, 10).map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                sx={{ height: "100%", cursor: "pointer" }}
                onClick={() => navigate(`/detail/${movie.id}`)}
              >
                <CardMedia
                  component="img"
                  image={
                    movie.poster_path
                      ? `${imgPath}${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=Sin+Imagen"
                  }
                  alt={movie.title}
                  sx={{ height: 350, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </section>
    </Box>
  );
}
