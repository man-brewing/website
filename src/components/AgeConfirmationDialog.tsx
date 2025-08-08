import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export interface AgeConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
}

const AgeConfirmationDialog = ({
  open,
  onClose,
}: AgeConfirmationDialogProps) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Typography>Age Verification</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you 21 or older?</DialogContentText>
        <DialogActions>
          <Button fullWidth={true} variant="contained" onClick={onClose}>
            Yes
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AgeConfirmationDialog;
