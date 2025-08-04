// src/pages/Home.jsx
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMovie } from "../hooks/useMovie"; // ✅ nuevo hook unificado
import {
    Box,
    Typography,
    Button
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

export default function Hero() {
    const navigate = useNavigate();

    // 👉 Usamos el mismo hook con diferentes instancias
    const {
        movies: trendingMovies,
        loading: loadingTrending,
        fetchMovies: fetchTrending
    } = useMovie();

    useEffect(() => {
        fetchTrending("now_playing");
    }, []);

    const imgPath = "https://image.tmdb.org/t/p/w500";

    const responsiveFull = {
        all: {
            breakpoint: { max: 4000, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <Box sx={{ padding: 0 }}>
            {/* 🔥 Películas en Tendencia */}
            <section>
                {loadingTrending ? (
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
                        {trendingMovies.slice(0, 10).map((movie) => (
                            <Box
                                key={movie.id}
                                sx={{
                                    position: "relative",
                                    width: "100vw",
                                    height: "90vh",
                                    overflow: "hidden",
                                    cursor: "pointer"
                                }}
                                onClick={() => navigate(`/detail/${movie.id}`)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                                    alt={movie.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                />

                                {/* 🔽 Degradado inferior */}
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
                                        animation: "fadeUp 1s ease-in-out",
                                        "@keyframes fadeUp": {
                                            "0%": { opacity: 0, transform: "translateY(20px)" },
                                            "100%": { opacity: 1, transform: "translateY(0)" }
                                        }
                                    }}
                                >
                                    <Typography variant="h4" fontWeight="bold">
                                        {movie.title}
                                    </Typography>
                                    <Typography variant="body1" maxWidth="600px" mt={1} mb={2}>
                                        {movie.overview || "Sin descripción disponible."}
                                    </Typography>
                                    <Box>
                                        <Button
                                          onClick={() => navigate(`/detail/${movie.id}`)}
                                            variant="contained"
                                            endIcon={<InfoIcon />}
                                            sx={{
                                                mt: 2,
                                                borderRadius: "30px",
                                                paddingX: 3,
                                                paddingY: 1,
                                                fontWeight: "bold",
                                                backgroundColor: "#00c853",
                                                textTransform: "none",
                                                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                                                "&:hover": {
                                                    backgroundColor: "#00e676",
                                                    transform: "scale(1.05)",
                                                    transition: "all 0.3s ease"
                                                }
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
