import React, { useEffect, useState } from "react";
import { supabase } from "../lib/api";
import {
  Button,
  Stack,
  Box,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Job from './Job'
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export type JobsProps = {

}

export default function Jobs(props: JobsProps) {
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
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


  return (
    <Stack gap={2}>
      <Box gap={2} sx={{ width: 20 }}>
        <Tooltip title="Create a Job?" placement="right">
          <Button onClick={handleClickOpen} variant="outlined">Create</Button>
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
                sx={{ margin: 2 }} 
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
              <TextField required id="outlined-basic" label="Amount in $" variant="outlined" sx={{ mt: 1 }} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addJob} autoFocus>
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Typography variant="h5">Recent jobs</Typography>
      {
        jobs?.map(job => (<Job click={props.click} job={job} />))
      }
    </Stack>
  );
}