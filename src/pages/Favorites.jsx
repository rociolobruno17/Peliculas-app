import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Grid, Typography, Card, CardMedia, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favoritos, toggleFavorito } = useContext(FavoriteContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: 4, pt: 12 }}>
      {favoritos.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Aún no agregaste películas a tu lista de favoritos
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
          {favoritos.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card
                onClick={() => navigate(`/detail/${movie.id}`)}
                sx={{
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out",
                  '&:hover': { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  image={movie.image}
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
                    "&:hover": { opacity: 8 },
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
                        toggleFavorito(movie); // ahora pasamos el objeto completo
                      }}
                      aria-label="Quitar de favoritos"
                    >
                      <FavoriteIcon color="error" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}

        </Grid>
      )
      }
    </Box >
  );
}

export default Favorites;

