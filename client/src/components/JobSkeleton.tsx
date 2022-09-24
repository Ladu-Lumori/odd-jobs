import React, { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import {
  Button,
  Stack,
  Grid,
  Box,
  Divider,
  Typography,
  Skeleton,
} from '@mui/material';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Job from './Job'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


function Skele() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <Card sx={{ bgcolor: '#add8e6', width: 700, }}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
              {/* <Avatar sx={{ bgcolor: deepPurple[250] }}>{props.avatar}</Avatar> */}
              <Skeleton animation="wave" variant="circular" width={55} height={50} />
              {/* <Typography sx={{  }} color="text.secondary">
            {props.name}
          </Typography> */}
              <Skeleton
                animation="wave"
                height={10}
                width={0}
                style={{ marginBottom: 6 }}
              />
            </Stack>
            {/* <Chip icon={<AttachMoney />} label={props.cash} /> */}
            {/* <Typography >
            ${props.cash}
          </Typography> */}
            <Skeleton animation="wave" height={10} width="5%" />
          </Grid>
          <Divider sx={{ mt: 1, mb: 1 }} />
          {/* <Typography sx={{ position: 'flex-end'}}>
            {props.description}
          </Typography> */}
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        </CardContent>
        <CardActions>
          {/* <Button variant="contained">Take</Button>
          <Button size="small" >Chat</Button> */}
          <Tooltip title="Create Job?" placement="top">
            <Fab onClick={handleClickOpen} color="secondary" aria-label="add">
              <AddIcon />
            </Fab>
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Job Creation"}
            </DialogTitle>
            <DialogContent>
              <Stack>
                <TextField required id="outlined-basic" label="Job title" variant="outlined" sx={{ margin: 2 }} />
                <TextField required id="outlined-basic" label="Job Description" variant="outlined" />
                <TextField required id="outlined-basic" label="Amount in $" variant="outlined" sx={{ mt: 1 }} />
              </Stack>
              {/* <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose} autoFocus>
                Create Job
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    );
  }