import React, { useState, useEffect } from 'react';
import { supabase } from "../lib/api";
import {
  Stack,
  Typography,
  Card
} from '@mui/material';
//import Messages from '../components/Messages';
//import Job from '../components/Job'


const Proposal = ({ proposal }) => {
  console.log(proposal);
  return (
    <Card sx={{ bgcolor: '#fff', width: 700, }}>
      <Stack>
        <Typography>{proposal.message}</Typography>
      </Stack>
    </Card>
  )
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
    <Stack direction="row">
      <Stack>
        <Typography variant="h3" gutterBottom>
          Proposals
        </Typography>
        <Stack gap={2}>
          {
            proposals.map((proposal) => <Proposal proposal={proposal} key={proposal.id} />)
          }
        </Stack>
        <Typography variant="h3" gutterBottom>
          Created jobs
        </Typography>
      </Stack>

    </Stack>
  );
}
