// src/components/Hero.jsx
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Box, Typography, Button } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router";

export default function Hero({ movies = [], loading, subtitulo = "" }) {
    const navigate = useNavigate();

    const responsiveFull = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
            slidesToSlide: 1,
        },
    };

    return (
        <Box sx={{ padding: 0 }}>
            <section>
                {loading ? (
                    <Typography variant="h6" align="center" mt={4}>
                        Cargando películas...
                    </Typography>
                ) : (
                    <Carousel
                        responsive={responsiveFull}
                        swipeable
                        draggable
                        infinite
                        keyBoardControl
                        autoPlay={false}
                        showDots={false}
                        arrows
                        containerClass="carousel-container"
                        itemClass="carousel-fullscreen-item"
                    >
                        {movies.slice(0, 10).map((movie) => (
                            <Box
                                key={movie.id}
                                sx={{
                                    position: "relative",
                                    width: "100vw",
                                    height: "100vh",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                }}
                                onClick={() => navigate(`/detail/${movie.id}`)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                                    alt={movie.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />

                                {/* 🔽 Degradado y texto */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                                        color: "white",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-end",
                                        px: 4,
                                        pb: 6,
                                    }}
                                >
                                    {/* 🆕 Subtítulo personalizado */}
                                    {subtitulo && (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                mb: 1,
                                                fontStyle: "italic",
                                                color: "#b0bec5",
                                            }}
                                        >
                                            {subtitulo}
                                        </Typography>
                                    )}

                                    <Typography variant="h4" fontWeight="bold">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body1" maxWidth="600px" mt={1} mb={2}>
                                        {movie.overview || "Sin descripción disponible."}
                                    </Typography>
                                    <Box sx={{ display: "flex", justifyContent: "flex-start", width: "fit-content" }}>
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Evita que el click en el botón navegue igual que el fondo
                                                navigate(`/detail/${movie.id}`);
                                            }}
                                            variant="contained"
                                            endIcon={<InfoIcon />}
                                            sx={{
                                                mt: 2,
                                                borderRadius: "30px",
                                                px: 3,
                                                py: 1,
                                                fontWeight: "bold",
                                                backgroundColor: "#00c853",
                                                textTransform: "none",
                                                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                                                "&:hover": {
                                                    backgroundColor: "#00e676",
                                                    transform: "scale(1.05)",
                                                    transition: "all 0.3s ease",
                                                },
                                            }}
                                        >
                                            Más info
                                        </Button>
                                    </Box>

                                </Box>
                            </Box>
                        ))}
                    </Carousel>
                )}
            </section>
        </Box>
    );
}
