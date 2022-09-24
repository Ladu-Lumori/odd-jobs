import { useRef, useState } from "react";
import { supabase } from "../lib/api";
import { Card, Box, TextField, Button } from '@mui/material';

const Auth = () => {
    const [helperText, setHelperText] = useState({ error: null, text: null });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();

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

    return (
        <Card>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
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
                    variant="contained"
                    onClick={() =>
                        handleLogin("REGISTER").catch(console.error)
                    }
                >Login</Button>
            </Box>
        </Card>
    );
};

export default Auth;