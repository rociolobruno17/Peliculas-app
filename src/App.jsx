import Router from "./routes/Router"
import { FavoriteContextProvider } from './context/FavoriteContext'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme'; // 👈 importás tu theme

function App() {


  return (
    <ThemeProvider theme={theme}>
      <FavoriteContextProvider>
        <CssBaseline />
        <Router />
      </FavoriteContextProvider>
    </ThemeProvider>
  )
}

export default App


