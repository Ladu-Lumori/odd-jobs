import React, { useEffect, useState, FC, useCallback, } from "react";
import {
  Typography
} from '@mui/material';

export type SettingsProps = {
  user: any;
}

const Settings = ({ user }) => {
  return(
    <Typography variant="h2" gutterBottom>
        Settings.
    </Typography>
  );
}

export default Settings;