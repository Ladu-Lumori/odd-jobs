import { useRef, useState } from "react";
import { supabase } from "../lib/api";
import { Card, Box, TextField, Button, Stack, Grid, Tab, Typography, } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const handleLogin = async (type) => {
        // const email = emailRef?.current?.value || "";
        // const password = passwordRef?.current?.value || "";

        const { user, error } =
            type === "LOGIN"
                ? await supabase.auth.signIn({ email, password })
                : await supabase.auth.signUp({ email, password });
        if (error) {
            setHelperText({ error: true, text: error.message });
        } else if (!user && !error) {
            setHelperText({
                error: false,
                text: "An email has been sent to you for verification!",
            });
        }
    };

    const handleOAuthLogin = async (provider) => {
        // You need to enable the third party auth you want in Authentication > Settings
        // Read more on: https://supabase.com/docs/guides/auth#third-party-logins
        let { error } = await supabase.auth.signIn({ provider });
        if (error) console.log("Error: ", error.message);
    };

    const forgotPassword = async (e) => {
        // Read more on https://supabase.com/docs/reference/javascript/reset-password-email#notes
        e.preventDefault();
        const email = prompt("Please enter your email:");

        if (email === null || email === "") {
            setHelperText({ error: true, text: "You must enter your email." });
        } else {
            let { error } = await supabase.auth.api.resetPasswordForEmail(
                email
            );
            if (error) {
                console.error("Error: ", error.message);
            } else {
                setHelperText({
                    error: false,
                    text: "Password recovery email has been sent.",
                });
            }
        }
    };

    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Stack sx={{ justifyContent:"center", alignItems:"center", mt:5}}>
            <Stack gap={2} direction='row'>
                <img alt='Omega' src='https://res.cloudinary.com/dmeugs1i4/image/upload/v1664893648/mi/icons8-omega_1_ntvzfv.svg' height={40} />
            <Typography variant="h4" sx={{alignItems:"center"}}>Odd jobs</Typography>
            </Stack>
        <Grid container sx={{ justifyContent:"center", alignItems:"center", mt:3 }}>
            <Card sx={{p:4}}>
            <TabContext value={value}>
            <TabList onChange={handleChange}  textColor="secondary" indicatorColor="secondary" aria-label="lab API tabs example" variant="fullWidth">
            <Tab label="Login" value="1"/>
            <Tab label="Sign up" value="2"/>
            </TabList>
            <TabPanel value="1"><Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <Stack gap={2} direction="column">
                <Typography>Already a Jobber</Typography>
                     <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type={"email"}
                        name={"email"}
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type={"password"}
                        name={"password"}
                        ref={passwordRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                    sx={{ bgcolor: "#7c6ea7" }}
                        variant="contained"
                        onClick={() =>
                            handleLogin("REGISTER").catch(console.error)
                        }
                    >Login</Button>
                </Stack>
                </Box></TabPanel>
                <TabPanel value="2"><Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                <Stack gap={2} direction="column">
                <Typography>Become a Jobber</Typography>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        type={"username"}
                        name={"username"}
                        ref={usernameRef}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                     <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type={"email"}
                        name={"email"}
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        type={"password"}
                        name={"password"}
                        ref={passwordRef}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button 
                    sx={{ bgcolor: "#7c6ea7" }}
                        variant="contained"
                        onClick={() =>
                            handleLogin("REGISTER").catch(console.error)
                        }
                    >Sign up</Button>
                </Stack>
                </Box></TabPanel>
            </TabContext>
            </Card>
        </Grid>
        </Stack>
    );
};

export default Auth;