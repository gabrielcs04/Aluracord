import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

export default function HomePage() {
  const [ username, setUsername ] = React.useState("gabrielcs04");
  const [ size, setSize ] = React.useState(username.length);
  const router = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          <Box
            as="form"
            onSubmit={(event) => {
              event.preventDefault();
              router.push(`/chat?username=${username}`);
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Text
              variant="body3"
              styleSheet={{
                fontSize: "24px",
                fontWeight: "bold",
                color: appConfig.theme.colors.neutrals["000"],
              }}
            >
              Boas vindas de volta!
            </Text>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setSize(e.target.value.length);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              disabled={size > 0 ? false : true}
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>

          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            {size > 0 && (
              <>
                <Image
                  styleSheet={{
                    borderRadius: "50%",
                    marginBottom: "16px",
                  }}
                  src={`https://github.com/${username}.png`}
                />
                <Text
                  variant="body4"
                  styleSheet={{
                    color: appConfig.theme.colors.neutrals[200],
                    backgroundColor: appConfig.theme.colors.neutrals[900],
                    padding: "3px 10px",
                    borderRadius: "1000px",
                  }}
                >
                  {username}
                </Text>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
