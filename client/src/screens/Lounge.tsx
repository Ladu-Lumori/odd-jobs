import React, { FC, useState, useEffect } from 'react';
import { supabase } from "../lib/api";
import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
  IconButton,
  Button,
  Badge,
  Drawer
} from '@mui/material';
import { Chat } from "../components/Chat";
import { MoreHoriz, Delete } from '@mui/icons-material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const ProposalDetails = ({ acceptProposal, proposal, rejectProposal }) => {
  return (
    <Stack>
      <Chat proposal={proposal}/>
    </Stack>
  )
}

const ProposalOverview = ({ acceptProposal, proposal, rejectProposal }) => {
  const [state, setState] = React.useState({
    right: false,
  });

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const isPopoverOpen = Boolean(anchorEl);
  const id = isPopoverOpen ? 'simple-popover' : undefined;

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.MouseEvent) => {
        setState({ ...state, [anchor]: open });
      };

  const handleAccept = () => {
    toggleDrawer('right', true);
  }

  return (
    <>
      <Card sx={{ bgcolor: '#fff', width: 700, }}>
        <CardContent>
          <Grid container sx={{ justifyContent: 'space-between' }}>
            <Typography sx={{}} color="text.secondary">
              {proposal?.jobs?.title}
            </Typography>
            <IconButton onClick={handlePopoverClick}>
              <MoreHoriz />
            </IconButton>
          </Grid>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Typography>{proposal.message}</Typography>

          <Grid container spacing={4}>
            <Grid item>
              <Typography sx={{ position: 'flex-end' }}>
                $ {proposal.jobs.amount}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ position: 'flex-end' }}>
                By: {proposal.user.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          {(['right'] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)} variant="contained">View Proposal</Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <ProposalDetails
                  proposal={proposal}
                  acceptProposal={acceptProposal}
                  rejectProposal={rejectProposal}
                />
              </Drawer>
            </React.Fragment>
          ))}
          <Button sx={{ ml: 3 }} onClick={rejectProposal} size="small" color="error" variant="outlined">Reject</Button>
        </CardActions>
      </Card>

    </>


  );
}

export type LoungeProps = {
  user: any;
}

const Lounge: FC<LoungeProps> = ({ user }) => {
  const [proposals, setProposals] = useState([]);

  const fetchProposals = async () => {
    let { data: proposals, error } = await supabase
      .from("proposals")
      .select("*")
      .order("id", { ascending: false })
      .neq('userId', `${user.id}`);
    if (error) console.log("error", error);
    else setProposals(proposals);
  };

  const rejectProposal = async () => {
    let { data: proposals, error } = await supabase
      .from("proposals")
      .select("*, jobs(*), user:userId(*)")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setProposals(proposals);
  };

  const acceptProposal = async () => {
    let { data: proposals, error } = await supabase
      .from("proposals")
      .select("*, jobs(*), user:userId(*)")
      .order("id", { ascending: false });
    if (error) console.log("error", error);
    else setProposals(proposals);
  };

  useEffect(() => {
    fetchProposals().catch(console.error);
  }, []);
  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={12}>
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
                proposals.map((proposal) => <ProposalOverview
                  key={proposal.id}
                  proposal={proposal}
                  acceptProposal={acceptProposal}
                  rejectProposal={rejectProposal}
                />)
              }
            </Stack>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Lounge;