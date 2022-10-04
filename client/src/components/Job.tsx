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
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Popover,
  IconButton,
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
import { MoreHoriz, Delete } from '@mui/icons-material';

import { deepPurple } from '@mui/material/colors';

type JobAttr = {
  id: number;
  title: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
  userId: string;
  user: {
    username?: string;
    avatar?: string;
    name?: string;
  }

}

type JobProps = {
  job: JobAttr;
  onClick?: () => void;
  user?: any;
};
type JobRequest = {
  message: string;
  heading: string;
};

export const Job: FC<JobProps> = (props) => {
  console.log(props.job)
  const [request, setRequest] = useState<JobRequest>({
    message: "",
    heading: "",
  });
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRequest((currentState) => {
      return {
        ...currentState,
        [name]: value,
      };
    });
  }, []);


  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isPopoverOpen = Boolean(anchorEl);
  const id = isPopoverOpen ? 'simple-popover' : undefined;

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const sendMessage = async () => {
    let { data: job, error } = await supabase.from("proposals")
      .insert({
        message: request.message,
        jobId: props.job.id,
        userId: props.user.id,
      })
      .single();
    // setChecked((prev) => !prev);
  }

  const handleClickOpen = () => {
    setDialogOpen(true);
    // setChecked((prev) => !prev);
  };

  const handleClose = () => {
    setDialogOpen(false);
    // setChecked((prev) => !prev);
  }

  const deleteJob = async () => {
    try {
        await supabase.from("jobs").delete().eq("id", props?.job?.id);
        // setTodos(todos.filter((x) => x.id !== id));
    } catch (error) {
        console.log("error", error);
    }
};

  return (
    <>
      <Stack direction="row" gap={2}>
        <Stack>
          <Card sx={{ bgcolor: '#fff8fa', width: 700, }}>
            <CardContent>
              <Grid container sx={{ justifyContent: 'space-between' }}>
                <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
                  <Avatar sx={{ bgcolor: deepPurple[250] }} alt={props.job?.user?.name}>{props.job?.user?.avatar}</Avatar>
                  <Typography sx={{}} color="text.secondary">
                  {props.job?.user?.name}
                  </Typography>
                </Stack>
                <IconButton onClick={handlePopoverClick}>
                  <MoreHoriz />
                </IconButton>
              </Grid>
              <Divider sx={{ mt: 1, mb: 1 }} />
              <Typography sx={{ position: 'flex-end' }}>
                {props?.job?.title}
              </Typography>
            </CardContent>
            <Dialog
              open={isDialogOpen}
              onClose={() => { }}
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
                <Button onClick={() => { }}>Cancel</Button>
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
      </Stack>
      <Popover
        id={id}
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList>
          {
            props.user?.id === props.job?.userId ? (<MenuItem onClick={deleteJob}>
              <ListItemIcon>
                <Delete fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete Job</ListItemText>
            </MenuItem>) : null
          }
        </MenuList>
      </Popover>
    </>
  );
}
