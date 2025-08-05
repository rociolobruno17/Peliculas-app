// src/components/MovieCard.jsx

import { Card, CardMedia, Box, Typography, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, esFavorito, toggleFavorito }) => {
  const navigate = useNavigate();

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=Sin+Imagen";

  const genreLabel = movie.genre_ids?.[0] === 18 ? "Drama"
                    : movie.genre_ids?.[0] === 10749 ? "Amor"
                    : "Película";

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

      {/* Overlay al hacer hover */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          color: "white",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 2,
          '&:hover': {
            opacity: 1
          }
        }}
      >
        <Typography variant="caption" sx={{ mb: 1 }}>
          {genreLabel}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }} noWrap>
          {movie.overview}
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
