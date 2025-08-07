import { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  IconButton
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";


function Buscar() {
  const [query, setQuery] = useState("");
  const { results, loading, error } = useSearchMovies(query);
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4, pt:12 }}>
      <Typography variant="h4" gutterBottom>
        Buscar Películas
      </Typography>

      <TextField
        fullWidth
        label="Buscar..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      <Grid container spacing={3}>
        {loading ? (
          <Typography variant="h6" align="center" mt={4} sx={{ width: "100%" }}>
            Buscando películas...
          </Typography>
        ) : error ? (
          <Typography variant="h6" align="center" color="error" mt={4} sx={{ width: "100%" }}>
            {error}
          </Typography>
        ) : results.length === 0 && query ? (
          <Typography variant="h6" align="center" mt={4} sx={{ width: "100%" }}>
            No se encontraron resultados para: "{query}"
          </Typography>
        ) : (
          results.map((movie) => (
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
                      e.stopPropagation();
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
    </Box>
  );
}

export default Buscar;
