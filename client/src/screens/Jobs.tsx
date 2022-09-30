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
  Fade
} from '@mui/material';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
// import Skele from '../components/JobSkeleton';
import Job from '../components/Job';

export type JobsProps = {
  job?: any;
  onClick: () => void;
}



export default function Jobs(props: JobsProps) {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
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

  const fetchJobs = async () => {
    let { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setJobs(jobs);
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
        })
        .single();
      if (error) {
        // handle error setError(error.message)
      } else {
        setJobs([job, ...jobs]);
        //setError(null);
        // newTaskTextRef.current.value = "";
      }
    }
  };

  useEffect(() => {
    fetchJobs().catch(console.error);
  }, []);

  // const expandJobCard = () =>{
  //   return(
  //     <Card sx={{ bgcolor: "grey", width: 600, height: 500, position: "flex-end}}>
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

  // const [checked, setChecked] = useState(false);

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
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const handleClick =
  //   (newPlacement: PopperPlacementType) =>
  //     (event: React.MouseEvent<HTMLButtonElement>) => {
  //       setAnchorEl(event.currentTarget);
  //       setOpun((prev) => placement !== newPlacement || !prev);
  //       setPlacement(newPlacement);
  //     };

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
      </Stack>  */}
  {/* //     <Stack>
  //  <Fade in={checked}>
  //    {expan()}
  //    </Fade>
  //    </Stack>  */}
     </Stack>
    )
  }

  const CreatedJob = (props) => {
    return(
      <Card sx={{ bgcolor: '#fff8fa', width: 700, mb: 2,}}>
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

  return (
    <Stack gap={2}>
      <Box gap={2} sx={{}}>
        <Typography variant="h4" gutterBottom>Job creation</Typography>
        <Tooltip title="Create a Job?" placement="right">
          <Button sx={{mt:2}} onClick={handleClickOpen} variant="outlined">Create</Button>
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
          <Typography variant="h5" gutterBottom  sx={{mt:2}}>Created Jobs</Typography>
          <Typography variant="body2" gutterBottom>
          View jobs you have created below and see how many jobers have proposed to take your job. Other jobers will be able to see your job and propose to take it, you can then accept or decline their proposal.
            </Typography>
        <Card sx={{ bgcolor: '#fff8fa', width: 700, mb: 2,}}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#7c6ea7' }}>YU</Avatar>
                <Typography sx={{}} color="text.secondary">
                  Your Username
                </Typography>
            </Stack>
              <Typography sx={{ position: 'flex-end' }}>
                $ 200
              </Typography>
          </Grid>
          <Divider sx={{ mt: 1, mb: 1 }} />
              <Typography sx={{ position: 'flex-end' }}>
                Roll up ting dis
              </Typography>
      </CardContent>
      <CardActions>
      <Badge badgeContent={3} color="secondary"><Button sx={{}} onClick={props.onClick} size="small" color="secondary" variant="outlined">Takers</Button></Badge>
      </CardActions>
      </Card>
      <CreatedJob title="Gisepe ting dis" amount="400"/>
      </Stack>
      </Box>
      <Typography variant="h5">Recent jobs</Typography>
      <ExampleJob title="Pipe Clog" description="I need someone to come and unclog my pipe" amount="200" avatar="YU" />
      {
        jobs?.map(job => (<Job onClick={props.onClick} job={job} key={job.id} />))
      }
    </Stack>
  );
}