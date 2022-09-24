import * as React from 'react';
import { Button, Stack } from '@mui/material';
import Nav from './Nav';
import Header from './Header';
import './style.css';

export default function App() {
  return (
    <Stack>
    <Header/>
    <Nav/>
    </Stack>
  );
}
