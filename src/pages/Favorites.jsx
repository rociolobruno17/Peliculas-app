import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { Grid, Typography, Card, CardMedia, CardContent, IconButton, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favoritos, toggleFavorito, esFavorito } = useContext(FavoriteContext);
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
        Mis Favoritos ⭐️
      </Typography>

      {favoritos.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center" }}>
          Aún no agregaste películas a tu lista de favoritos
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center" sx={{ px: 2 }}>
          {favoritos.map(({ id, title, image }) => (
            <Grid item xs={12} sm={6} md={3} key={id}>
              <Card
                sx={{ height: "100%", cursor: "pointer", position: "relative" }}
                onClick={() => navigate(`/detail/${id}`)}
              >
                <CardMedia
                  component="img"
                  image={image}
                  alt={title}
                  sx={{ height: 350, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" component="div" gutterBottom>
                    {title}
                  </Typography>
                </CardContent>
                <Box sx={{ position: "absolute", top: 8, right: 8 }}>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // para que no se dispare el navigate
                      toggleFavorito({ id, title, image });
                    }}
                    aria-label="Quitar de favoritos"
                  >
                    <FavoriteIcon color="error" />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Favorites;
