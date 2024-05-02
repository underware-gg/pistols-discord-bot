import React from "react";
import { useRouter } from "next/router";
import { Button, Divider } from "semantic-ui-react";
import App from "@/components/App";
import Logo from "@/components/Logo";

export default function IndexPage() {
  const router = useRouter();

  //   const handleLogin = () => {
  //     router.push("/api/oauth");
  //   }

  const _login = () => {
    const app_id = process.env.NEXT_PUBLIC_CLIENT_ID
    const redirect_uri = encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI)
    const url = `https://discord.com/oauth2/authorize?client_id=${app_id}&response_type=code&redirect_uri=${redirect_uri}&scope=identify+email`
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
        <Button onClick={() => _play()}>
          Play the Game!
        </Button>

        <Divider />
        <h3 className="TitleCase">Discord Users</h3>
        <p className="TitleCase">
          Link a Duelist to your Discord account<br/>
          to receive notifications and interact with the game
        </p>
        <Button onClick={() => _login()}>
          Discord Login
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
