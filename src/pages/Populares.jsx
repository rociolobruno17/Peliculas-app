// src/pages/Populares.jsx
import React from "react";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

export default function Populares() {
  const { movies, loading, error } = usePopularMovies();

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
        Películas Populares
      </Typography>

      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card sx={{ height: "100%" }}>
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
              <CardContent>
                <Typography variant="subtitle1" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.release_date}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
