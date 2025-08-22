import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMovie } from "../hooks/useMovie";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

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

  if (loading || loadingVideos) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "black",
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{ color: 'primary.main' }}
        />
      </Box>
    );
  }
  if (error || errorVideos) {
    return (
      <Typography color="error" align="center" mt={4}>
        Error al cargar los datos.
      </Typography>
    );
  }
  if (!movieDetail) return null;


  const handleShowTrailer = () => {
    if (!trailer) return;

    Swal.fire({
      html: `
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
        <iframe 
          src="https://www.youtube.com/embed/${trailer.key}" 
          frameborder="0" 
          allow="autoplay; encrypted-media" 
          allowfullscreen
          style="position:absolute;top:0;left:0;width:100%;height:100%;border-radius:8px;">
        </iframe>
      </div>
    `,
      width: "800px",
      background: "#000",
      showConfirmButton: false,
      customClass: {
        popup: "trailer-modal"
      }
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // Degradé de negro a transparente de izquierda a derecha
          background: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          zIndex: 0
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ zIndex: 1, width: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            px: { xs: 4, md: 12 },
            py: { xs: 4, md: 12 }
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: { xs: "flex-start", md: "center" },
              gap: 4,
            }}
          >
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ alignSelf: "flex-start" }}
            >
              <Box sx={{ flexShrink: 0, maxWidth: "300px", mt: 6 }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                  alt={movieDetail.title}
                  style={{
                    borderRadius: 12,
                    width: "100%", // ocupa todo el contenedor
                    boxShadow: "0px 4px 30px rgba(0,0,0,0.6)",
                  }}
                />
              </Box>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                maxWidth: "600px",
                textAlign: "left" // dejalo fijo
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  fontWeight: 700,
                  lineHeight: 1.2,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.2)",
                }}
              >
                {movieDetail.title}
              </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.9)"
              }}
            >
              {movieDetail.overview}
            </Typography>

            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              ⭐ {movieDetail.vote_average} — 🎬 {movieDetail.release_date}
            </Typography>

            {trailer && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowTrailer}
                sx={{
                  mt: 2,
                  borderRadius: "20px",
                  px: 3,
                  py: 1.2,
                  fontSize: "1rem",
                  textTransform: "none",
                  fontWeight: "bold"
                }}
              >
                Ver Tráiler
              </Button>
            )}
          </motion.div>
        </Box>
    </Box>
  </motion.div >
</Box >

  );
}
