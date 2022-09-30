import { useState, useEffect } from "react";
import { supabase } from "./lib/api";
import { Stack } from '@mui/material';
import Nav from './components/Nav';
import Header from './components/Header';
import './index.css';
import Auth from "./components/Auth";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  return (
    <>
      {!user ? <Auth /> : (
        <>
          <Stack>
            <Header/>
            <Nav user={user}/>
          </Stack>
        </>
      )}
    </>
  );
}


//user={user}