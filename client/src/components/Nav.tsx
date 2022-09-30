import * as React from 'react';
import {
  Tab,
  Tabs,
  Tooltip,
  Stack,
  Box
} from '@mui/material';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
//import { InboxIcon, MailIcon  } from '@mui/icons-material';
import Dash from '../screens/Dash';
import Jobs from '../screens/Jobs';
import Settings from '../screens/Settings';
import Lounge from '../screens/Lounge';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';




export default function Nav(props){
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClick = () => {
    setValue("3");
  }

  function HideOnScroll(props) {
    const { children} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger();
  
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return(
    <Stack>
    <TabContext value={value}>
    <TabList onChange={handleChange} textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example" centered>
      <Tab label="Dashboard" value="1"/>
      <Tab label="Jobs" value="2"/>
      <Tab label="Lounge" value="3"/>
      <Tooltip title="You don't have permission to do this" followCursor><Box><Tab label="Settings" value="4" disabled/></Box></Tooltip>
    </TabList>
      <TabPanel value="1"><Dash user={props?.user}/></TabPanel>
      <TabPanel value="2"><Jobs onClick={handleClick}/></TabPanel>
      <TabPanel value="3"><Lounge/></TabPanel>
      <TabPanel value="4"><Settings/></TabPanel>
    </TabContext>
    </Stack>
  );
}

// user={props?.user}