import React from "react";
import {useHistory} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const BuyButton = ({ event, isTime, login }) => {

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => {
    if (!login.isLoggedIn) {
      setOpen(true)
    } else {
      history.push({
        pathname: "/payment", state: { event: event }
      });
    }

  }
  const handleClose = () => {
    setOpen(false);
    history.push({
      pathname: "/payment", state: { event: event }
    });
  };

  const handleLogim = () => {
    history.push("/login");
  }


  //<Link to={{ }} >

  return <div className="flex flex-col justify-center bg-green-600 px-0" style={{ alignSelf: "center", padding: "5px", width: "95px", textAlign: "center", float: 'right', borderRadius: "5px" }} className={"bg-buttonColor  hover:bg-indigo-600"}>
    <button onClick={handleOpen} disabled={isTime}>Buy Ticket</button>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Message"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Continue Checkout as Guest
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleLogim}>
          Login
        </Button>
        <Button onClick={handleClose} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  </div>
}

export default BuyButton;