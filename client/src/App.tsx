import * as React from 'react';
import { Button, Stack } from '@mui/material';
import Nav from './components/Nav';
import Header from './components/Header';
import './index.css';

export default function App() {
  return (
    <Stack>
    <Header/>
    <Nav/>
    </Stack>
  );
}
