// src/pages/Populares.jsx
import { useNavigate } from "react-router";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";


export default function Populares() {
  const { movies, loading, error } = usePopularMovies();
    const navigate = useNavigate();

  if (loading) {
    return <Typography variant="h6" align="center" mt={4}>Cargando películas...</Typography>;
  }

  if (error) {
    return (
      <Typography variant="h6" align="center" color="error" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Peliculas Populares
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card
              sx={{ height: "100%", cursor: "pointer" }}
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
              <Box sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" fullWidth>
                  Ver detalle
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}