import React from "react";
import { JwtPayload, verify } from "jsonwebtoken";
import { parseCookies } from "nookies";
import Dashboard from "@/components/dashboard";
import App from "@/components/App";

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.token;
  try {
    const decoded = verify(token, "thisisasecret") as JwtPayload;
    return { props: { user: decoded.user } };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
}

const DashboardPage = ({ user }) => {
  return (
    <App>
      <Dashboard user={user} />
    </App>
  );
}

export default DashboardPage;
