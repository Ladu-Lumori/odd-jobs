import React, { FC, useCallback, useState } from 'react';
import { supabase } from "../lib/api";
import {
  Button,
  Stack,
  Grid,
  Divider,
  Avatar,
  Typography,
  Box,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  CardActions,
  TextField,
  Fade,
} from '@mui/material';
import Popper, { PopperPlacementType } from '@mui/material/Popper';

import { deepPurple } from '@mui/material/colors';

type JobAttr = {
  id: number;
  title: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  user: {
    username: string;
    avatar: string;
  }

}

type JobProps = {
  job: JobAttr;
  onClick: () => void;
};
type JobRequest = {
  message: string;
  heading: string;
};

const Job: FC<JobProps> = (props) => {


  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState<JobRequest>({
    message: "",
    heading: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
   // setChecked((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
   // setChecked((prev) => !prev);
  }

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((currentState) => {
      return {
        ...currentState,
        [name]: value,
      };
    });
  }, []);

  // const expan = () =>{
  //   return(
  //     <Card sx={{ bgcolor: "grey", width: 600, height: 450, position: "flex-start"}}>
  //       <Stack m={1} gap={4}>
  //       <Typography variant="h5">
  //         Details
  //       </Typography>
  //       <Typography>
  //       {props.job.description}
  //       </Typography>
  //       </Stack>
  //     </Card>
  //   );
  // }
  const [opun, setOpun] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpun((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
      };

  const canBeOpen = opun && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;


  const sendMessage = async () => {
    let { data: job, error } = await supabase.from("proposals")
      .insert({
        message: request.message,
        jobId: 6 // use dynamic job id
      })
      .single();
   // setChecked((prev) => !prev);
  }

  return (
    <Stack direction="row" gap={2}>
      <Stack>
        <Card sx={{ bgcolor: '#fff8fa', width: 700, }}>
          <CardContent>
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: deepPurple[250] }}>{props.job.user.avatar}</Avatar>
                <Typography sx={{}} color="text.secondary">
                  Username.
                </Typography>
              </Stack>
              <Typography sx={{ position: 'flex-end' }}>
                ${props.job.amount}
              </Typography>
            </Grid>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography sx={{ position: 'flex-end' }}>
              {props.job.title}
            </Typography>
          </CardContent>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Request To Work on Job"}
            </DialogTitle>
            <DialogContent>
              <Stack gap={2}>
                <TextField
                  required id="outlined-basic"
                  label="Message to client"
                  variant="outlined"
                  onChange={onChange}
                  value={request.message}
                  name="message"
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={sendMessage} autoFocus>
                Send
              </Button>
            </DialogActions>
          </Dialog>
          <CardActions>
            <Button sx={{ bgcolor: "#7c6ea7" }} variant="contained" onClick={handleClickOpen}>Take</Button>
          </CardActions>
        </Card>
      </Stack>
      <Stack>
        <Popper id={id} open={opun} anchorEl={anchorEl} placement={placement} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box sx={{ p: 1, bgcolor: 'background.paper' }}>
                <Card sx={{ bgcolor: "grey", width: 600, position: "flex-start" }}>
                  <Stack m={1} gap={4}>
                    <Typography variant="h5">
                      Details
                    </Typography>
                    <Typography>
                      {props.job.description}
                    </Typography>
                  </Stack>
                </Card>
              </Box>
            </Fade>
          )}
        </Popper>
      </Stack>
      {/* <Stack>
    <Fade in={checked}>
      {expan()}
      </Fade>
      </Stack> */}
    </Stack>
  );
}

export default Job;