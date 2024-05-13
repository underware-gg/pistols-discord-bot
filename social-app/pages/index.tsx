import React from "react";
import { useRouter } from "next/router";
import { Button, Divider } from "semantic-ui-react";
import Logo from "@/components/Logo";
import App from "@/components/App";

export default function IndexPage() {
  const router = useRouter();

  //   const handleLogin = () => {
  //     router.push("/api/oauth");
  //   }

  const _login = () => {
    const options = {
      client_id: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URL,
      response_type: 'code',
      scope: 'identify email',
    }
    const url = 'https://discord.com/oauth2/authorize?' + new URLSearchParams(options)
    router.push(url)
  }

  const _play = () => {
    router.push(process.env.NEXT_PUBLIC_CLIENT_URL)
  }

  const _addBot = () => {
    router.push(process.env.NEXT_PUBLIC_DISCORD_ADD_BOT_URL)
  }

  return (
    <App>
      <div className="AlignCenter">
        <Logo />
        <h1 className="TitleCase">Pistols at 10 Blocks</h1>

        <Divider />
        <h3 className="TitleCase">Discord Users</h3>
        <p className="TitleCase">
          Link a Duelist to your Discord account<br/>
          to receive notifications and interact with the game
        </p>
        <Button onClick={() => _login()}>
          Discord Login
        </Button>

        <br />
        <Button onClick={() => _play()}>
          Go to the Game
        </Button>

        <Divider />
        <h3 className="TitleCase">Server Admins</h3>
        <Button onClick={() => _addBot()}>
          Add Bot to Server
        </Button>


      </div>
    </App>
  );
}
