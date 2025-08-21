import { Box, Button, Typography } from "@mui/material";
import Logo3d from "../assets/Logo3d.png";

export default function Error404({
  eyebrow = "ERROR 404",
  title = "Ups, algo pasó...",
  message = "Intentá nuevamente o volvé al inicio.",
  image = Logo3d, // ✅ por defecto usa Logo3d
  primaryAction,
  secondaryAction,
  fullScreen = true,
  sx = {},
  imageSx = {}, // ✅ ahora es un objeto vacío
}) {
  return (
    <Box
      sx={{
        height: fullScreen ? "100vh" : "auto",
        minHeight: fullScreen ? "100vh" : 300,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        textAlign: "center",
        color: "white",
        borderRadius: fullScreen ? 0 : 2,
        px: 2,
        py: fullScreen ? 0 : 6,
            margin: "0 auto",   // ✅ centra dentro de su contenedor padre
        ...sx,
      }}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: fullScreen ? "20%" : 24,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
            fontWeight: "bold",
            color: "rgba(0, 128, 255, 0.25)",
            zIndex: 0,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {eyebrow}
        </Typography>
      )}

      {/* Imagen */}
      {image && (
        <Box
          component="img"
          src={image} // ✅ ahora usa la prop
          alt={title}
          sx={{ width: 300, maxWidth: "80vw", zIndex: 1, ...imageSx }}
        />
      )}

      {/* Título y mensaje */}
      <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", zIndex: 1 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, zIndex: 1 }}>
        {message}
      </Typography>

      {/* Acciones */}
      <Box sx={{ display: "flex", gap: 1, zIndex: 1 }}>
        {primaryAction && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "#00ff99", "&:hover": { backgroundColor: "#00e089" } }}
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        )}
        {secondaryAction && (
          <Button variant="text" onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </Button>
        )}
      </Box>
    </Box>
  );
}
