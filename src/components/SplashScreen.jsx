import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Logo from "../assets/Logo.svg";

export default function SplashScreen() {
    const navigate = useNavigate();

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
                src={Logo}
                alt="Fílmico"
                sx={{
                    width: {
                        xs: "150px", // móvil
                        sm: "200px", // tablet
                        md: "250px", // desktop
                    },
                    height: "auto",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                    scale: [0.5, 1, 1.5],
                    opacity: [0, 1, 0],
                }}
                transition={{
                    duration: 3,
                    times: [0, 0.3, 1],
                    ease: "easeInOut",
                }}
            />
        </Box>
    );
}
