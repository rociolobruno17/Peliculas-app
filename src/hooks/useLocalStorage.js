import { useState, useEffect } from "react";

function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => {
    const guardado = localStorage.getItem(key);
    return guardado ? JSON.parse(guardado) : valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(valor));
  }, [key, valor]);

  return [valor, setValor];
}

export default useLocalStorage;

// Hook	                 ¿Para qué sirve?	                                 ¿Dónde lo usarías?
// useLocalStorage	     Guardar info que persista al recargar página  	   En FavoritesContext.jsx