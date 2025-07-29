import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function DetailMovie() {
  const { id } = useParams();
  const { movieDetail, loading, error } = useMovieDetail(id);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>{error}</Typography>;
  if (!movieDetail) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 4,
        color: "#fff",
        textShadow: "1px 1px 4px rgba(0,0,0,0.9)"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "600px", gap: 2 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          alt={movieDetail.title}
          style={{ borderRadius: 8, maxWidth: "100%" }}
        />
        <Typography variant="h4">{movieDetail.title}</Typography>
        <Typography variant="body1">{movieDetail.overview}</Typography>
        <Typography variant="body2">⭐ {movieDetail.vote_average}</Typography>
        <Typography variant="body2">🎬 Fecha de estreno: {movieDetail.release_date}</Typography>
      </Box>
    </Box>
  );
}
