import React from "react";
import { useRouter } from "next/router";
import { Button } from "semantic-ui-react";
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

  return (
    <App>
      <div className="AlignCenter">
        <Logo />
        <h1 className="TitleCase">Pistols at 10 Blocks</h1>
        <h3 className="TitleCase">Social Link</h3>
        <div className="Spacer10" />
        <Button onClick={() => _login()}>
          Discord Login
        </Button>
        <div style={{ height: "5vh" }}>&nbsp;</div>
      </div>
    </App>
  );
}
