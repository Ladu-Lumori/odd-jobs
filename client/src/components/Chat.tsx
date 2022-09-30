import { Typography, Container, Stack, Grid, TextField, Button } from '@mui/material';
import { useEffect, useState } from "react";
// import Messages from "./Messages";
import { BsChevronDoubleDown } from "react-icons/bs";

const messages = [
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
      <Typography>{message.text}</Typography>
    </Stack>
  )
}

export const Chat = () => {


  return (
    <Container sx={{ bgcolor: "#fff", p:2 }}>
      <Stack>
        {messages.map((message) => <ChatBubble key={message.id} message={message} />)}
      </Stack>
      <Stack>
        <Grid sx={{mt:6}} container spacing={4}>
          <Grid item xs={12} md={8}>
          <TextField id="mess=age" label="Message" fullWidth variant="standard" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button variant="contained" color="primary">Send</Button>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

/**
 * <Messages />
        {!isOnBottom && (
          <div
            style={{
              position: "sticky",
              bottom: 8,
              // right: 0,
              float: "right",
              cursor: "pointer",
            }}
            onClick={scrollToBottom}
          >
            {unviewedMessageCount > 0 ? (
              <Badge
                ml="1"
                fontSize="0.8em"
                colorScheme="green"
                display="flex"
                borderRadius="7px"
                padding="3px 5px"
                alignItems="center"
              >
                {unviewedMessageCount}
                <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
              </Badge>
            ) : (
              <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
            )}
          </div>
        )}
 */


/**
 * 
 *   const [height, setHeight] = useState(window.innerHeight - 205);
  const {
    scrollRef,
    onScroll,
    scrollToBottom,
    isOnBottom,
    unviewedMessageCount,
  } = useAppContext();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight - 205);
    });
  }, []);
 */