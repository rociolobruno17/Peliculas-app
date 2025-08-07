import { Box, Typography, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

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
        Hecho por{" "}
        <Link
          href="https://www.behance.net/lobruno"
          target="_blank"
          rel="noopener"
          color="#02FFA1"
          underline="hover"
        >
          Rocio Lobruno | UX/UI Designer & Frontend Developer
        </Link>
      </Typography>

      <Box
        mt={2}
        sx={{ display: "flex", justifyContent: "center", gap: 2 }}
      >
        <Link
          href="https://www.linkedin.com/in/rocio-lobruno/"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <LinkedInIcon fontSize="medium" />
        </Link>
        <Link
          href="https://www.instagram.com/ui.rociolobruno/"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <InstagramIcon fontSize="medium" />
        </Link>
        <Link
          href="https://github.com/rociolobruno17"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <GitHubIcon fontSize="medium" />
        </Link>
      </Box>
    </Box>
  );
}
