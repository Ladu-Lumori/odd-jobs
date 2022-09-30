import * as React from 'react';
import { Button,
  Stack,
  Grid,
  Divider,
  Typography,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Badge,
  } from '@mui/material';

export default function Dash({user}){ 
  // console.log(user);
  return(
    <Stack>
    <Typography variant="h3" gutterBottom>
        {user.email}
    </Typography>
    <Stack direction="row" gap={1} justifyContent="space-between">
      <Card sx={{ bgcolor: '#D4af47', height: 150, m:4}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Balance:
          </Typography>
          <Typography variant="h4" gutterBottom>
           $ 0.00
          </Typography>
        </CardContent>
      </Card>
      <Stack direction="row" gap={2} justifyContent="space-around">
      <Card sx={{ bgcolor: '#FFB6C1', height: 150}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
          Jobs Completed:
          </Typography>
          <Typography variant="h4" gutterBottom>
          11
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ bgcolor: '#FFB6C1', height: 150}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
          Cash made: 
          </Typography>
          <Typography variant="h4" gutterBottom>
          $3400
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ bgcolor: '#FFB6C1', height: 150}}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
          Time spent here 
          </Typography>
          <Typography variant="h4" gutterBottom>
          2 months
          </Typography>
        </CardContent>
      </Card>
      </Stack>
    {/* <Card sx={{justifyContent: 'space-between', bgcolor: '#FFB6C1', width: 1000, }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Jobs Completed: 11</Typography>
        <Typography variant="h4" gutterBottom>Cash made: $3400</Typography>
        <Typography variant="h4" gutterBottom>Time spent here: 2 months</Typography>
      </CardContent>
    </Card> */}
    </Stack>
    <Typography variant="h4" gutterBottom>
          Taken jobs
        </Typography>
        <Card sx={{ bgcolor: '#fff8fa', width: 700, mb: 2}}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#7c6ea7' }}>DB</Avatar>
                <Typography sx={{}} color="text.secondary">
                  Drower Benza
                </Typography>
            </Stack>
              <Typography sx={{ position: 'flex-end' }}>
                $ 500
              </Typography>
          </Grid>
          <Divider sx={{ mt: 1, mb: 1 }} />
              <Typography sx={{ position: 'flex-end' }}>
                Area raid need members
              </Typography>
      </CardContent>
      <CardActions>
      <Button sx={{color:"#FFA500"}} onClick={() => {}} size="small" >Pending</Button>
      </CardActions>
      </Card>
      <Card sx={{ bgcolor: '#fff8fa', width: 700, mb: 2}}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
              <Avatar sx={{ bgcolor: '#7c6ea7' }}>BS</Avatar>
                <Typography sx={{}} color="text.secondary">
                  Bangi Samuel
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
      <Badge badgeContent={2} color="success"><Button sx={{}} onClick={() => {}} size="small" color="success" variant="outlined">Chat</Button></Badge>
      </CardActions>
      </Card>
    </Stack>
  );
}