import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    justifyContent : "left",
  },
  drawer : {
    paddingTop : "20px",
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  btnRoot : {
    paddingLeft : "5px",
    justifyContent : "left !important"
  },
  subMenu : {
    paddingLeft : "20px !important",
  }
}));
export default useStyles;