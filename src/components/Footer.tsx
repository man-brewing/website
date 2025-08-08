import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const Footer = () => {
  return (
    <footer
      style={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
      }}
    >
      <Paper
        style={{
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#424242',
        }}
        sx={{ '& .MuiButton-root': { color: '#ffffff' } }}
        square
      >
        <a
          target="blank"
          href="https://www.google.com/maps/place/2837+N+Pierce+St,+Milwaukee,+WI+53212/@43.0698428,-87.9069123,15z/data=!4m5!3m4!1s0x8805192fc89a6315:0xab2810b41f950d70!8m2!3d43.0701594!4d-87.9030329"
        >
          <Button>Find Us</Button>
        </a>
        <a target="blank" href="mailto:webmaster@man-brewing.ddns.net">
          <Button>Contact Us</Button>
        </a>
      </Paper>
    </footer>
  );
};

export default Footer;
