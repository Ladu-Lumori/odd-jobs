import React, { useEffect, useState, FC, useCallback, } from "react";
import { supabase } from "../lib/api";
import {
  Button,
  Stack,
  Box,
  Typography,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Divider,
  Badge,
} from '@mui/material';
import { Job } from '../components/Job';


export type JobsProps = {
  job?: any;
  onClick: () => void;
  user: any;
}


const Jobs: FC<JobsProps> = (props) => {
  const [open, setOpen] = useState(false);
  const [createdJobs, setCreatedJobs] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [jobAmount, setJobAmount] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleTakeOpen = () => {
    setOpun(true);
  };

  const handleTakeClose = () => {
    setOpun(false);
  };

  const handleClose = () => {
    setOpen(false);
  }

  const fetchRecentJobs = async () => {
    let { data: jobs, error } = await supabase
      .from("jobs")
      .select("*, user:userId(*)")
      .order("id", { ascending: false })
      .eq('taken', false)
      .neq('userId', `${props?.user.id}`); // only show jobs taken by the user
    if (error) console.log("error", error);
    else setRecentJobs(jobs);
  };

  const fetchCreatedJobs = async () => {
    let { data: jobs, error } = await supabase
      .from("jobs")
      .select("*, user:userId(*)")
      .order("id", { ascending: false })
      .eq('userId', `${props?.user.id}`); // only show jobs taken by the user
    if (error) console.log("error", error);
    else setCreatedJobs(jobs);
  };

  const addJob = async () => {
    let taskText = jobTitle;
    let task = taskText.trim();
    if (task.length <= 3) {
      //setError("Task length should be more than 3!");
    } else {
      let { data: job, error } = await supabase
        .from("jobs")
        .insert({
          title: task,
          description: jobDescription,
          amount: jobAmount,
          userId: props.user.id,
        })
        .single();
      if (error) {
        // handle error setError(error.message)
      } else {
        setCreatedJobs([job, ...createdJobs]);
        //setError(null);
        // newTaskTextRef.current.value = "";
      }
    }
  };



  useEffect(() => {
    fetchRecentJobs().catch(console.error);
    fetchCreatedJobs().catch(console.error);
  }, []);

  const handleButtonChange = () => {
    setStatus(false);
    setOpun(false);
  };

  const handleButtonChangeBack = () => {
    setStatus(true);
    setOpun(false);
  }

  const [opun, setOpun] = useState(false);
  const [status, setStatus] = useState(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


  const canBeOpen = opun && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;

  // const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setRequest((currentState) => {
  //     return {
  //       ...currentState,
  //       [name]: value,
  //     };
  //   });
  // }, []);

  return (
    <Stack gap={2}>
      <Box gap={2} sx={{}}>
        <Typography variant="h4" gutterBottom>Job creation</Typography>
        <Tooltip title="Create a Job?" placement="right">
          <Button sx={{ mt: 2 }} onClick={handleClickOpen} variant="outlined">Create</Button>
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
              <TextField
                required id="outlined-basic"
                label="Job title"
                variant="outlined"
                onChange={e => setJobTitle(e.target.value)}
                value={jobTitle}
              />
              <TextField
                required id="outlined-basic"
                label="Job Description"
                variant="outlined"
                onChange={e => setJobDescription(e.target.value)}
                value={jobDescription}
              />
              <TextField
                required id="outlined-basic"
                label="Amount in $"
                variant="outlined"
                onChange={e => setJobAmount(e.target.value)}
                value={jobAmount}
                sx={{ mt: 1 }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addJob} autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
        <Stack gap={2}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>Created Jobs</Typography>
          <Typography variant="body2" gutterBottom>
            View jobs you have created below and see how many jobers have proposed to take your job. Other jobers will be able to see your job and propose to take it, you can then accept or decline their proposal.
          </Typography>
          <Stack  gap={2}>
            {
              createdJobs?.map(job => (<Job onClick={props.onClick} job={job} key={job.id} user={props?.user} />))
            }
          </Stack>
        </Stack>
      </Box>
      <Typography variant="h5">Recent jobs</Typography>
      <Stack  gap={2}>
        {
          recentJobs?.map(job => (<Job onClick={props.onClick} job={job} key={job.id} user={props?.user} />))
        }
      </Stack>
    </Stack>
  );
}


export default Jobs;

/**
 * 
  const ExampleJob = (props) => {
    return(
       <Stack direction="row" gap={2}>
       <Stack>
        <Card sx={{ bgcolor: '#fff8fa', width: 700, }}>
          <CardContent>
            <Grid container sx={{ justifyContent: 'space-between' }}>
              <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
                <Avatar sx={{ bgcolor: '#7c6ea7' }}>{props.avatar}</Avatar>
                <Typography sx={{}} color="text.secondary">
                  Username.
                </Typography>
              </Stack>
              <Typography sx={{ position: 'flex-end' }}>
                ${props.amount}
              </Typography>
            </Grid>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Typography sx={{ position: 'flex-end' }}>
              {props.title}
            </Typography>
          </CardContent>
          {
            status ?
            <Dialog
            open={opun}
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
                  onChange={()=>{}}
                  name="message"
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTakeClose}>Cancel</Button>
              <Button onClick={handleButtonChange} autoFocus>
                Send
              </Button>
            </DialogActions>
          </Dialog>
          :
          <Dialog
            open={opun}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Job request"}
            </DialogTitle>
            <DialogContent>
              <Stack gap={2}>
                <Typography>
                  Your job request is awaiting approval from the jobber creater
                </Typography>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTakeClose}>Cancel</Button>
              <Button onClick={handleButtonChangeBack} color="error" autoFocus>
                Opt Out
              </Button>
            </DialogActions>
          </Dialog>
        }
          <CardActions>
            {
              status ?
              <Button sx={{ bgcolor: "#7c6ea7" }} variant="contained" onClick={handleTakeOpen}>Take</Button>
              :
              <Button sx={{color:"#FFA500"}} onClick={handleTakeOpen} size="small" >Pending</Button>
              }
          </CardActions>
        </Card>
       </Stack>
       {/* <Stack>
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
                      {props.description}
                    </Typography>
                  </Stack>
                </Card>
              </Box>
            </Fade>
          )}
        </Popper>
      </Stack>  

  </Stack>
  )
}
 */


/**
 * 
 * 
  const CreatedJob = (props) => {
    return (
      <Card sx={{ bgcolor: '#fff8fa', width: 700, mb: 2, }}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#7c6ea7' }}>YU</Avatar>
              <Typography sx={{}} color="text.secondary">
                Your Username
              </Typography>
            </Stack>
            <Typography sx={{ position: 'flex-end' }}>
              $ {props.amount}
            </Typography>
          </Grid>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography sx={{ position: 'flex-end' }}>
            {props.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button sx={{}} onClick={props.onClick} size="small" color="secondary" variant="outlined">Takers</Button>
        </CardActions>
      </Card>
    );
  };

 */