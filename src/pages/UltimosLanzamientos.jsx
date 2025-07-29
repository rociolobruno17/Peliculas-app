import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";

export default function UltimosLanzamientos() {
  const { NowPlayingMovies, loading, error } = useNowPlayingMovies();

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
        Ultimos Lanzamientos
      </Typography>

      <Grid container spacing={3}>
        {NowPlayingMovies.slice(0, 20).map((movie) => (
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
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" component="div" gutterBottom>
                  {movie.title}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    console.log("Ir a detalles de:", movie.id);
                    // Más adelante aquí pondremos navigate(`/detalle/${movie.id}`)
                  }}
                >
                  Ver detalle
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}