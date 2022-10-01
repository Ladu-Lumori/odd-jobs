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
  Typography
} from '@mui/material';
import Messages from '../components/Messages';
import Job from '../components/Job'

export default function Lounge(){
  return(
    <Stack direction="row">
    <Stack>
    <Typography variant="h3" gutterBottom>
        Taken Jobs
    </Typography>
    <Stack gap={2}>
    <Job name="Ladu Man" cash="1000.00" description="Help me get rid of my demons" avatar="LM"/>
    <Job name="Ladu Man" cash="1000.00" description="Help me get rid of my demons" avatar="LM"/>
    </Stack>
    <Typography variant="h3" gutterBottom>
        Created jobs
    </Typography>
    <Stack gap={2}> 
    <Job name="Me" cash="100.00" description="Help me get some demons" avatar="Me"/>
    <Job name="Me" cash="100.00" description="Help me get some demons" avatar="Me"/>
    </Stack>
    </Stack>
    <Messages/>
    </Stack>
  );
}