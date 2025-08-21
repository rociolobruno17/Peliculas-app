import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.svg";
import Logo3d from "../assets/Logo3d.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // true si es móvil

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        bgcolor: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <motion.img
        src={isMobile ? Logo3d : Logo}   // ✅ cambia según pantalla
        alt="Fílmico"
        style={{ width: isMobile ? 150 : 250, height: "auto" }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [0.5, 1, 1.5], opacity: [0, 1, 0] }}
        transition={{ duration: 3, times: [0, 0.3, 1], ease: "easeInOut" }}
      />
    </Box>
  );
}
