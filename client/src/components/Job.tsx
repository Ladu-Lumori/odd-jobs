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
  TextField
} from '@mui/material';

import { ThreeDRotation } from '@mui/icons-material';
import { deepPurple } from '@mui/material/colors';

type JobProps = {
  job: any;
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
  };

  const handleClose = () => {
    setOpen(false);
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


  const sendMessage = async () => {
    let { data: job, error } = await supabase.from("proposals")
      .insert({
        message: request.message,
        jobId: 6 // use dynamic job id
      })
      .single();
  }


  return (
    <Card sx={{ bgcolor: '#fff', width: 700, }}>
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: deepPurple[250] }}>{props.avatar}</Avatar>
            <Typography sx={{}} color="text.secondary">
              {props.job.title}
            </Typography>
          </Stack>
          <ThreeDRotation />
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography sx={{ position: 'flex-end' }}>
          {props.job.description}
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
              label="Subject"
              variant="outlined"
              onChange={onChange}
              value={request.heading}
              name="heading"
            />
            <TextField
              required id="outlined-basic"
              label="Message"
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
        <Button variant="contained" onClick={handleClickOpen}>Take</Button>
        <Button onClick={() => {}} size="small">Chat</Button>
      </CardActions>
    </Card>
  );
}

export default Job;