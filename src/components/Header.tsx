import Typography from '@mui/material/Typography';
import Background from '../assets/hops_banner.jpg';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Link } from 'react-router';

const Header = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '200px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant={'h1'} color="#212529" fontWeight={'400'}>
          M.A.N. Brewing
        </Typography>
      </Box>
      <Paper style={{ backgroundColor: '#424242' }} square>
        <Tabs
          value={false}
          centered
          sx={{ '& .MuiTab-root': { color: '#ffffff' } }}
        >
          <Tab label={'Home'} component={Link} to="/" />
          <Tab label={'Fermentorium'} component={Link} to="/fermentorium" />
          <Tab label={'About'} component={Link} to="/about" />
        </Tabs>
      </Paper>
    </>
  );
};

export default Header;
