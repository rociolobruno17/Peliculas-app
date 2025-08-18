import { useState, useEffect, useContext } from "react";
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
import { FavoriteContext } from "../context/FavoriteContext";
import Error404 from "../components/Error404";
import Logo3d from "../assets/Logo3d.png";


function Buscar() {
  const [query, setQuery] = useState("");
  const { results, loading, error, searchMovies } = useSearchMovies();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);
  const navigate = useNavigate();

  // Aquí controlamos cuándo buscar
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchMovies(query);
    });

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <Box sx={{ padding: 4, pt: 12 }}>


      <TextField
        label="Buscar por título, colección, tema..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          position: "sticky",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          maxWidth: "500px",
          backgroundColor: "#0D0D1A",
          borderRadius: "8px",
          mb: 4,
          zIndex: 10,             // suficiente para estar arriba del grid, pero no romper layout
        }}
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

        ) : results.length === 0 && query.trim() ? (
          <Error404
            fullScreen={false}
            eyebrow="SIN RESULTADOS"
            title="No encontramos esa película"
            message={`No encontramos la película “${query}”, ¿probamos con otra? o explorá lo popular.`}
            image={Logo3d}
            imageSx={{ width: 220 }}
            primaryAction={{
              label: "Ver Populares",
              onClick: () => navigate("/populares"),
            }}
            secondaryAction={{
              label: "Limpiar búsqueda",
              onClick: () => setQuery(""),
            }}
          />

        ) : (

          results.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              
              <Card
                onClick={() => navigate(`/detail/${movie.id}`)}
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out",
                  '&:hover': {
                    transform: "scale(1.05)",
                  }
                }}
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

                {/* Overlay con fade */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                    color: "#fff",
                    opacity: 0,
                    transition: "opacity 0.1s ease",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 2,
                    "&:hover": {
                      opacity: 8,
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {movie.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      mt: 0.5,
                    }}
                  >
                    {movie.overview || "Sin descripción disponible."}
                  </Typography>


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
