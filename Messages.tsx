import * as React from 'react';
import { Button,
  Stack,
  Grid,
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Typography,
  TextField,
  Paper
} from '@mui/material';
import { createStyles, makeStyles, Theme } from "@mui/material/styles";
import SendIcon from '@mui/icons-material/Send';


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     wrapForm : {
//         display: "flex",
//         justifyContent: "center",
//         width: "95%",
//         margin: `${theme.spacing(0)} auto`
//     },
//     wrapText  : {
//         width: "100%"
//     },
//     button: {
//         //margin: theme.spacing(1),
//     },
//   })
// );
// className={classes.wrapForm}
// className={classes.wrapText}
// className={classes.button}

const TextInput = () => {
    //const classes = useStyles();
    return (
        <Stack>
            <form noValidate autoComplete="off">
            <TextField
                id="standard-text"
                label="Negotiate"
                //margin="normal"
            />
            <Button variant="contained" color="primary">
                <SendIcon />
            </Button>
            </form>
        </Stack>
    );
}

{/* <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 128,
          height: 128,
        },
      }}
    >
      <Paper elevation={3} />
    </Box> */}

export default function Messages(){
  function Message(){
    return(
      <Stack>
        <Typography sx={{alignItems: 'center'}} variant="h3" gutterBottom>
          Messages.
        </Typography>
        <TextInput/>
      </Stack>
    );
  }
  return(
    <Box
      sx={{
        alignItems: "flex-start",
        display: 'fixed',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 700,
          height: 400,
        },
      }}
    >
      <Paper sx={{display: 'fixed'}} children={<Message/>} elevation={3}/>
    </Box>
  );
}