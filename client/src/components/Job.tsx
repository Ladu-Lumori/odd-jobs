import * as React from 'react';
import {
  Button,
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
  IconButton,
  Tabs,
  Avatar,
  Chip,
  Container,
  Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { AttachMoney, AccountCircle, ThreeDRotation  } from '@mui/icons-material';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Job(props) {

  console.log(props.job);
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
          {/* <Chip icon={<AttachMoney />} label={props.cash} /> */}
          <ThreeDRotation  />
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography sx={{ position: 'flex-end' }}>
          {props.job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Take</Button>
        <Button onClick={props.click} size="small">Chat</Button>
      </CardActions>
    </Card>
  );
}