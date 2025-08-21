import { useState, useEffect, useContext } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Card,
  CardMedia,
  IconButton,
  CircularProgress
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteContext } from "../context/FavoriteContext";
import Error404 from "../components/Error404";
import Logo3d from "../assets/Logo3d.png";
import Peli from "../assets/Peli.png";


function Buscar() {
  const [query, setQuery] = useState("");
  const { results, loading, error, searchMovies } = useSearchMovies();
  const { toggleFavorito, esFavorito } = useContext(FavoriteContext);
  const navigate = useNavigate();

  // controlamos la búsqueda
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchMovies(query);
    }, 300); // pequeño delay para debounce
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const showHero = query.trim() === "";

  return (
    <Box sx={{ padding: 4, pt: 12 }}>
      <Typography variant="h5" gutterBottom>
        Buscar
      </Typography>

      <TextField
        fullWidth
        label="Por título, colección, tema..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ mb: 4 }}
      />

      {/* Hero con logo + frase */}
      {showHero && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
            textAlign: "center",
          }}
        >
          <Box
            component="img"
            src={Peli}
            alt="Logo 3D"
            sx={{
              width: { xs: "150px", sm: "200px", md: "250px" },
              mb: 0,
            }}
          />
          <Typography variant="h6" color="text.primary">
            ¿Qué tenés ganas de ver hoy?
          </Typography>
        </Box>
      )}

      <Grid container spacing={3} justifyContent={"center"}>
        {loading ? (
          <Box
            sx={{
              height: "70vh", 
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "black", // 
            }}
          >
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: 'primary.main' }} 
            />
          </Box>
        ) : error ? (
          <Typography variant="h6" align="center" color="error" mt={4} sx={{ width: "100%" }}>
            {error}
          </Typography>
        ) : results.length === 0 && query.trim() ? (
          <Error404
            fullScreen={false}
            title={`No encontramos la película “${query}”.`}
            message={`¿probamos con otra? o explorá lo más popular.`}
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
                  "&:hover": { transform: "scale(1.05)" },
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
                    "&:hover": { opacity: 0.8 },
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
                            : "https://via.placeholder.com/500x750?text=Sin+Imagen",
                        });
                      }}
                      aria-label="Agregar a favoritos"
                    >
                      {esFavorito(movie.id) ? (
                        <FavoriteIcon color="error" />
                      ) : (
                        <FavoriteBorderIcon sx={{ color: "white" }} />
                      )}
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
