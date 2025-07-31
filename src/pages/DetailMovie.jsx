import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMovie } from "../hooks/useMovie";
import { Box, Typography, CircularProgress, Button } from "@mui/material";

export default function DetailMovie() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  const {
    movieDetail,
    videos,
    loading,
    loadingVideos,
    error,
    errorVideos,
    fetchMovieDetail,
    fetchVideos
  } = useMovie();

  useEffect(() => {
    fetchMovieDetail(id);
    fetchVideos(id);
  }, [id]);

  const trailer = videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  if (loading || loadingVideos) return <CircularProgress />;
  if (error || errorVideos) return <Typography>Error al cargar los datos.</Typography>;
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

        {trailer && (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => setShowTrailer(true)}
              sx={{ mt: 2, width: "fit-content" }}
            >
              ▶ Ver Tráiler
            </Button>

            {showTrailer && (
              <Box sx={{ mt: 2 }}>
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
