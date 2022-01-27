import React from "react";
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import { createClient } from '@supabase/supabase-js'
import appConfig from "../config.json";

const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage(props) {
  const [ message, setMessage ] = React.useState('');
  const [ messageList, setMessageList ] = React.useState([]);

  React.useEffect(() => {
    supabaseClient
      .from('messageList')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        setMessageList(data);
      })
  }, []);

  function handleNewMessage(newMessage) {
    if (newMessage.trim() === '') {
      return;
    }

    const message = {
      from: 'gabrielcs04',
      text: newMessage,
    }

    supabaseClient
      .from('messageList')
      .insert([message])
      .then(({ data }) => {
        setMessageList([
          data[0],
          ...messageList 
        ]);
      })

    setMessage('');
  }

  function handleDeleteMessage(id) {
    const filterMessageList = messageList.filter((item) => item.id !== id);
    
    supabaseClient
      .from('messageList')
      .delete()
      .match({ id: id })

    setMessageList(filterMessageList);
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList messages={messageList} deleteMessage={handleDeleteMessage} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center"
            }}
          >
            <TextField
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter" && e.shiftKey == false) {
                  e.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "8px 12px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={() => {handleNewMessage(message)}}
              variant="tertiary"
              colorVariant="neutral"
              styleSheet={{
                height: "80%",
                marginBottom: '10px',
              }}
              label={
                <Image
                  styleSheet={{
                    width: "20px",
                  }}
                  src={"https://cdn-icons-png.flaticon.com/512/60/60525.png"}
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messages.map((message) => {
        return (
          <Text
            key={message.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "8px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: "8px",
              }}
            >
              <Box
                styleSheet={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${message.from}.png`}
                />
                <Text tag="strong">{message.from}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {new Date().toLocaleDateString()}
                </Text>
              </Box>
              <Button
                onClick={() => props.deleteMessage(message.id)}
                label="Excluir"
                variant='tertiary'
              />
            </Box>
            {message.text}
          </Text>
        );
      })}
    </Box>
  );
}
