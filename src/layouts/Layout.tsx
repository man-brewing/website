import Stack from '@mui/material/Stack';
import { useContext } from 'react';
import { Outlet } from 'react-router';
import AgeConfirmationDialog from '../components/AgeConfirmationDialog';
import ConfigContext from '../context/ConfigContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = () => {
  const { isAgeVerified, setIsAgeVerified } = useContext(ConfigContext);

  return (
    <Stack sx={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Header />
      <AgeConfirmationDialog
        open={!isAgeVerified}
        onClose={() => setIsAgeVerified(true)}
      />
      <Outlet />
      <Footer />
    </Stack>
  );
};

export default Layout;
