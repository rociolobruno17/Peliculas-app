import Router from "./routes/Router"
import { FavoriteContextProvider } from './context/FavoriteContext'
import CssBaseline from '@mui/material/CssBaseline';

function App() {


  return (
    <FavoriteContextProvider>
      <CssBaseline />
        <Router />
    </FavoriteContextProvider>
      
  )
}

export default App


