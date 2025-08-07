// src/components/Footer.jsx

import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0D0D1A",
        color: "#B0B0B0",
        textAlign: "center",
        py: 8,
        mt: 8,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Fílmico — Todos los derechos reservados.
      </Typography>
      <Typography variant="body2" mt={1}>
        Hecho con ❤️ por{" "}
        <Link href="https://tulink.dev" target="_blank" rel="noopener" color="#02FFA1" underline="hover">
          Rocio Lobruno | Diseñadora UX/UI & Frontend Developer
        </Link>
      </Typography>
    </Box>
  );
}
