import * as React from 'react';
import {
  Tab,
  Stack
} from '@mui/material';
import Dashboard from '../screens/Dashboard';
import Jobs from '../screens/Jobs';
import Settings from '../screens/Settings';
import Lounge from '../screens/Lounge';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Services from '../screens/Services';




export default function Nav(props){
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setValue("3");
  }

  return(
    <Stack>
    <TabContext value={value}>
    <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example" centered>
      <Tab label="Dashboard" value="1"/>
      <Tab label="Jobs" value="2"/>
      <Tab label="Lounge" value="3"/>
      <Tab label="Services" value="4"/>
      <Tab label="Settings" value="5"/>
    </TabList>
      <TabPanel value="1"><Dashboard user={props?.user}/></TabPanel>
      <TabPanel value="2"><Jobs onClick={handleClick} user={props?.user}/></TabPanel>
      <TabPanel value="3"><Lounge user={props?.user}/></TabPanel>
      <TabPanel value="4"><Services user={props?.user}/></TabPanel>
      <TabPanel value="5"><Settings user={props?.user}/></TabPanel>
    </TabContext>
    </Stack>
  );
}