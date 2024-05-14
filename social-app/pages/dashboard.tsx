import React from "react";
import { JwtPayload, verify } from "jsonwebtoken";
import { parseCookies } from "nookies";
import Dashboard from "@/components/dashboard";
import App from "@/components/App";

const JWT_SECRET = process.env.JWT_SECRET || 'thisisasecret';

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.token;
  try {
    const decoded = verify(token, JWT_SECRET) as JwtPayload;
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
  // console.log(`Discord user:`, user)
  return (
    <App>
      <Dashboard user={user} />
    </App>
  );
}

export default DashboardPage;
