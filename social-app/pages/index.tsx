import React from "react";
import Link from "next/link";
import App from "@/components/App";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/api/oauth");
  };

  return (
    <App>
      <div className="AlignCenter">
        <Logo />
        <h1 className="TitleCase">Pistols</h1>
        <div className="Spacer10" />
        <a href="https://discord.com/oauth2/authorize?client_id=1232095996423704677&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Foauth&scope=identify+email">
          <button className="button">Discord Login</button>
        </a>
        <div style={{ height: "5vh" }}>&nbsp;</div>
      </div>
    </App>
  );
}
