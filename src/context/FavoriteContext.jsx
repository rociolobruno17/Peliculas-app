import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const FavoriteContext = createContext();

export const FavoriteContextProvider = ({ children }) => {
const [favoritos, setFavoritos] = useLocalStorage("favoritos-peliculas", []);

  // Saber si ya está en favoritos
  const esFavorito = (id) => favoritos.some(fav => fav.id === id);

  // Agregar o quitar
  const toggleFavorito = (pelicula) => {
    if (esFavorito(pelicula.id)) {
      const nuevosFavoritos = favoritos.filter(fav => fav.id !== pelicula.id);
      setFavoritos(nuevosFavoritos);
    } else {
      setFavoritos([...favoritos, pelicula]);
    }
  };

  const data = {
    favoritos,
    toggleFavorito,
    esFavorito
  };

  return (
    <FavoriteContext.Provider value={data}>
      {children}
    </FavoriteContext.Provider>

  );
};
export default FavoriteContext;