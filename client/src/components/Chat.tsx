import { Typography, Container, Stack, Grid, TextField, Button } from '@mui/material';
import React, { FC, useState, useEffect } from 'react';
// import Messages from "./Messages";
import { BsChevronDoubleDown } from "react-icons/bs";
import { supabase } from "../lib/api";

const dummymessages = [
  {
    id: 1,
    text: "Hello",
    sender: "Ladu",
    receiver: "Eman",
  },
  {
    id: 2,
    text: "How are you?",
    sender: "Eman",
    receiver: "Ladu",
  },
  {
    id: 3,
    text: "I am fine",
    sender: "Ladu",
    receiver: "Eman",
  },
  {
    id: 4,
    text: "What about you?",
    sender: "Eman",
    receiver: "Ladu",
  }
]

const ChatBubble = ({ message }) => {
  const background = message.sender === "Ladu" ?  "#fff" : "#333";
  const color = message.sender === "Ladu" ?  "#333" : "#fff";
  return (
    <Stack style={{ 
      background, 
      color,
      margin: "0.2rem", 
      padding: "0.5rem", 
      width: "fit-content" 
    }}>
      <Typography>{message.chat}</Typography>
    </Stack>
  )
}

export const Chat = ({ proposal }) => {
  console.log(proposal);

  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const sendMessage = async () => {
    let { data: message, error } = await supabase
    .from("messages")
    .insert({
      chat: text,
      senderId: proposal.jobs.userId,
      receiverId: proposal.userId,
      proposalId: proposal.id,
    })
    .single();
  if (error) {
    // handle error setError(error.message)
  } else {
    setMessages([message, ...messages]);
    //setError(null);
    // newTaskTextRef.current.value = "";
  }
  }

  const fetchMessages = async () => {
    let { data: messages, error } = await supabase
      .from("messages")
      .select("*, user:userId(*)")
    if (error) console.log("error", error);
    else setMessages(messages);
  };

  useEffect(() => {
    fetchMessages().catch(console.error);
  }, []);

  return (
    <Container sx={{ bgcolor: "#fff", p:2 }}>
      <Stack>
        {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
      </Stack>
      <Stack>
        <Grid sx={{mt:6}} container spacing={4}>
          <Grid item xs={12} md={8}>
          <TextField 
            id="mess=age" 
            label="Message" 
            fullWidth 
            variant="standard"
            onChange={(e) => setText(e.target.value)}
          />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
