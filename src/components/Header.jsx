import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../assets/Logo.svg";

export default function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Quité "Inicio"
  const menuItems = [
    { label: "Populares", path: "/populares" },
    { label: "Últimos Lanzamientos", path: "/ultimos" },
    { label: "Favoritos", path: "/favoritos" },
    { label: "Buscar", path: "/buscar" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",  // negro translúcido
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",  // 🧊 bisel blanco
          boxShadow: "none",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1300,
        }}
      >
        <Toolbar>
          <Box
            component="img"
            src={Logo} // ✅ Usa la importación
            alt="Fílmico"
            sx={{
              height: 20,
              mr: 2,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />


          {isMobile ? (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                {menuItems.map(({ label, path }) => (
                  <MenuItem key={label} onClick={() => handleNavigate(path)}>
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            menuItems.map(({ label, path }) => (
              <Button
                key={label}
                variant="header"  // <--- aquí aplicas el variant especial para header
                onClick={() => navigate(path)}
              >
                {label}
              </Button>
            ))
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
