import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export interface BrewerBioProps {
  img: string;
  name: string;
  bio: string;
}

const BrewerBio = ({ img, name, bio }: BrewerBioProps) => {
  return (
    <div style={{ margin: '20px', textAlign: 'center', flexGrow: 1 }}>
      <Paper elevation={0} sx={{ boxShadow: 'none', border: 'none' }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <img
              src={img}
              alt={name}
              style={{
                width: 250,
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography gutterBottom variant="subtitle1">
              {name}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {bio}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BrewerBio;
