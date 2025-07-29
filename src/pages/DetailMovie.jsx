import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function DetailMovie() {
  const { id } = useParams();
  const { movideDetail, loading, error } = useMovieDetail(id);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>{error}</Typography>;
  if (!movideDetail) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movideDetail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 4,
        color: "#fff",
        textShadow: "1px 1px 4px rgba(0,0,0,0.9)"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "600px", gap: 2 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movideDetail.poster_path}`}
          alt={movideDetail.title}
          style={{ borderRadius: 8, maxWidth: "100%" }}
        />
        <Typography variant="h4">{movideDetail.title}</Typography>
        <Typography variant="body1">{movideDetail.overview}</Typography>
        <Typography variant="body2">⭐ {movideDetail.vote_average}</Typography>
        <Typography variant="body2">🎬 Fecha de estreno: {movie.release_date}</Typography>
      </Box>
    </Box>
  );
}
