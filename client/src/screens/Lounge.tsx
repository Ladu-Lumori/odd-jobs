import * as React from 'react';
import { Button,
  Stack,
  Typography
} from '@mui/material';
//import Messages from '../components/Messages';
//import Job from '../components/Job'

export default function Lounge(){
  return(
    <Stack direction="row">
    <Stack>
    <Typography variant="h3" gutterBottom>
        Taken Jobs
    </Typography>
    <Stack gap={2}>
    </Stack>
    <Typography variant="h3" gutterBottom>
        Created jobs
    </Typography>
    </Stack>
    
    </Stack>
  );
}

// <Messages/>