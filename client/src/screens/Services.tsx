import React, { FC, useState, useEffect } from 'react';
import { supabase } from "../lib/api";
import {
    Stack,
    Typography,
    Grid,
} from '@mui/material';


export type ServicesProps = {
    user: any;
}

const Services: FC<ServicesProps> = ({ user }) => {
    return (
        <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
                <Stack>
                    <Typography variant="h5" gutterBottom>
                        Messages
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        A project proposal is a document that defines the necessary steps towards solving a particular problem. It presents a logical progression and description
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default Services;