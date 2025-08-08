import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home.tsx';
import Layout from './layouts/Layout.tsx';
import { ConfigProvider } from './context/ConfigContext.tsx';
import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material';

let theme = createTheme({});
theme = responsiveFontSizes(theme);

const Fermentorium = lazy(() => import('./pages/Fermentorium.tsx'));
const About = lazy(() => import('./pages/About.tsx'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </ConfigProvider>
  </StrictMode>
);
