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
  IconButton,
  Tabs,
  Typography,
  Avatar,
  Chip,
  Container
} from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AttachMoney from '@mui/icons-material/AttachMoney';
import { deepOrange, deepPurple } from '@mui/material/colors';

export default function Job(props){
  return(
    <Card sx={{ bgcolor: '#add8e6', width: 700, }}>
      <CardContent>
      <Grid container sx={{ justifyContent: 'space-between'}}>
        <Stack gap={1} direction="row" sx={{alignItems: 'center'}}>
      <Avatar sx={{ bgcolor: deepPurple[250] }}>{props.avatar}</Avatar>
        <Typography sx={{  }} color="text.secondary">
          {props.name}
        </Typography>
        </Stack>
        {/* <Chip icon={<AttachMoney />} label={props.cash} /> */}
        <Typography >
          ${props.cash}
        </Typography>
        </Grid>
        <Divider sx={{mt:1, mb:1}} />
        <Typography sx={{ position: 'flex-end'}}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained">Take</Button>
        <Button onClick={props.click} size="small" >Chat</Button>
      </CardActions>
    </Card>
  );
}