// src/pages/Error404.jsx
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo3d from "../assets/Logo3d.png"; // tu imagen PNG

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        position: "relative",
        textAlign: "center",
        color: "white",
      }}
    >
      {/* Texto repetido en el fondo */}
      <Typography
        variant="h1"
        sx={{
          position: "absolute",
          top: "20%",
          fontSize: "5rem",
          fontWeight: "bold",
          color: "rgba(0,0,255,0.5)",
          zIndex: 0,
          userSelect: "none",
        }}
      >
        ERROR 404
      </Typography>

      {/* Imagen 3D */}
      <Box
        component="img"
        src={Logo3d}
        alt="Error 404"
        sx={{ width: "300px", zIndex: 1 }}
      />

      {/* Texto y botones */}
      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold" }}>
        Ups, parece que falta algo...
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Es posible que haya escrito mal la dirección o que la página se haya movido
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#00ff99" }}
          onClick={() => navigate("/")}
        >
          Volver a Home
        </Button>
        <Button variant="text" onClick={() => alert("Abrir soporte")}>
          Contactar con soporte
        </Button>
      </Box>
    </Box>
  );
}
