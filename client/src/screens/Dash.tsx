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
  Typography,
  Card,
  CardContent,
  Chip
} from '@mui/material';

export default function Dash(){
  return(
    <Stack>
    <Typography variant="h3" gutterBottom>
        Your Dashboard. 
    </Typography>
    <Stack direction="row" gap={1}>
      <Card sx={{ bgcolor: '#7c6ea7', height: 150}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Balance:
          </Typography>
          <Typography variant="h4" gutterBottom>
            <Chip label='$0.00'/>
          </Typography>
        </CardContent>
      </Card>
    <Card sx={{justifyContent: 'space-between', bgcolor: '#7c6ea7', width: 1000, }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Jobs Completed: 11</Typography>
        <Typography variant="h4" gutterBottom>Cash made: $3400</Typography>
        <Typography variant="h4" gutterBottom>Time spent here: 2 months</Typography>
      </CardContent>
    </Card>
    </Stack>
    </Stack>
  );
}