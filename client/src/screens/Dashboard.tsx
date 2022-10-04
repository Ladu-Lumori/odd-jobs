import React, { useEffect, useState, FC, useCallback, } from "react";
import { supabase } from "../lib/api";
import {
  Stack,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { Job } from '../components/Job';

export type DashboardProps = {
  user: any;
};

const Dashboard: FC<DashboardProps> = ({ user }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    let { data: jobs, error } = await supabase
      .from("jobs")
      .select("*")
      .order("id", { ascending: false })
      .eq('takenBy', `${user.id}`); // only show jobs taken by the user
    if (error) console.log("error", error);
    else setJobs(jobs);
  };

  useEffect(() => {
    fetchJobs().catch(console.error);
  }, []);

  return (
    <Stack>
      <Typography variant="h3" gutterBottom>
        {user.email}
      </Typography>
      <Stack direction="row" gap={1} justifyContent="space-between">
        <Card sx={{ bgcolor: '#D4af47', height: 150, m: 4 }}>
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
          <Card sx={{ bgcolor: '#FFB6C1', height: 150 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Jobs Completed:
              </Typography>
              <Typography variant="h4" gutterBottom>
                11
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: '#FFB6C1', height: 150 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Cash made:
              </Typography>
              <Typography variant="h4" gutterBottom>
                $3400
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: '#FFB6C1', height: 150 }}>
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
      </Stack>
      <Typography variant="h4" gutterBottom>
        Taken jobs
      </Typography>
      <Stack>
        {jobs.map((job) => <Job job={job} key={job.id} user={user} />)}
      </Stack>
    </Stack>
  );
}

export default Dashboard;