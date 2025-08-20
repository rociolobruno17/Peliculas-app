import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { motion } from "framer-motion"; // 👈 importamos framer-motion
import Logo from "../assets/Logo.svg";

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 3000); // ⏳ 3 segundos en total (dura la animación)
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
                src={Logo}
                alt="Fílmico"
                sx={{
                    height: {
                        xs: "50px", // móvil
                        sm: "70px", // tablet
                        md: "100px", // desktop
                    },
                    width: "auto",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                    scale: [0.5, 1, 1.5], // pequeño → normal → grande
                    opacity: [0, 1, 0],   // aparece y luego se desvanece
                }}
                transition={{
                    duration: 3,          // duración total
                    times: [0, 0.3, 1],   // control de etapas (30% crecer, 70% desvanecer)
                    ease: "easeInOut",
                }}
            />
        </Box>
    );
}
