// src/components/MovieCard.jsx

import { Card, CardMedia, Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, esFavorito, toggleFavorito }) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";


  return (
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
        image={imageUrl}
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
                image: imageUrl
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
  );
};

export default MovieCard;
