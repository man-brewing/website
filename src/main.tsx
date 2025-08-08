import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home.tsx';
import Layout from './layouts/Layout.tsx';
import { ConfigProvider } from './context/ConfigContext.tsx';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';
import Fermentorium from './pages/Fermentorium.tsx';
import About from './pages/About.tsx';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/fermentorium" element={<Fermentorium />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ConfigProvider>
  </StrictMode>
);
