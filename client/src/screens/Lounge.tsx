import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/api";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Avatar,
  Button,
  Badge
} from '@mui/material';
// import Messo from '../Messo';
//import Messages from '../components/Messages';
//import Job from '../components/Job'
import { Chat } from "../components/Chat";


const Proposal = ({ proposal }) => {
  return (
    <Card sx={{ bgcolor: '#fff', width: 700, }}>
      <CardContent>
        <Grid container sx={{ justifyContent: 'space-between' }}>
          <Stack gap={1} direction="row" sx={{ alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: '#7c6ea7' }}></Avatar>
            <Typography sx={{}} color="text.secondary">
              Username.
            </Typography>
          </Stack>
          <Typography sx={{ position: 'flex-end' }}>
            $ {proposal.jobs.amount}
          </Typography>
        </Grid>
        <Divider sx={{ mt: 1, mb: 1 }} />
        <Typography>{proposal.jobs.title}</Typography>
      </CardContent>
      <CardActions>
        <Badge badgeContent={1} color="success"><Button sx={{}} onClick={() => { }} size="small" color="success" variant="outlined">Chat</Button></Badge>
        <Button sx={{ ml: 3 }} onClick={() => { }} size="small" color="error" variant="outlined">Reject</Button>
      </CardActions>
    </Card>

  );
}

export default function Lounge() {
  const [proposals, setProposals] = useState([]);

  const fetchProposals = async () => {
    let { data: proposals, error } = await supabase
      .from("proposals")
      .select("*, jobs(*)")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setProposals(proposals);
  };

  useEffect(() => {
    fetchProposals().catch(console.error);
  }, []);
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={6}>
        <Stack gap={2}>
          <Stack>
            <Typography variant="h5" gutterBottom>
              Proposals
            </Typography>
            <Typography variant="body2" gutterBottom>
              A project proposal is a document that defines the necessary steps towards solving a particular problem. It presents a logical progression and description
            </Typography>
            <Stack gap={2}>
              {
                proposals.map((proposal) => <Proposal proposal={proposal} key={proposal.id} />)
              }
            </Stack>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack>
          <Typography variant="h5" gutterBottom>
            Messages
          </Typography>
          <Typography variant="body2" gutterBottom>
              A project proposal is a document that defines the necessary steps towards solving a particular problem. It presents a logical progression and description
            </Typography>
            <Chat />
        </Stack>
      </Grid>
    </Grid>
  );
}
