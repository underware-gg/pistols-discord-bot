import { parseCookies, destroyCookie } from "nookies";
import { verify } from "jsonwebtoken";
import { useState } from "react";
import Image from "next/image";
import App from "@/components/App";
import Router from "next/router";

const Dashboard = ({ user }) => {
  const [walletAddresses, setWalletAddresses] = useState({
    duelist: user?.duelist || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWalletAddresses({ ...walletAddresses, [name]: value });
  };

  const handleLogout = () => {
    destroyCookie(null, "token"); // Clear authentication token
    Router.push("/api/logout"); // Redirect to logout endpoint
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send updated walletAddresses to the backend
    console.log("Updated Wallet Addresses:", walletAddresses);
  };

  const avatarUrl =
    user && user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : "/default-avatar.png";

  return (
    <App>
      <div className="AlignCenter">
        <h1>Dashboard</h1>
        {user ? (
          <>
            <p>Welcome, {user.username}!</p>
            <p>Email: {user.email}</p>
            <p>Discord ID: {user.id}</p>
            <span className="AlignCenter Profilepicture">
              <img
                src={avatarUrl}
                alt="User Avatar"
                width={100}
                height={100}
                className="Profileimage"
              />
            </span>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="duelist">Duelist Address:</label>
                <input
                  className="form-control"
                  type="text"
                  id="duelist"
                  name="duelist"
                  value={walletAddresses.duelist}
                  onChange={handleChange} // Add onChange handler here
                />
              </div>
              <button type="submit" className="walletbutton">
                Save Changes
              </button>
            </form>
            <button onClick={handleLogout} className="logoutbutton">
              Logout
            </button>
          </>
        ) : (
          <p>You are not logged in.</p>
        )}
      </div>
    </App>
  );
};

export async function getServerSideProps(context) {
  const cookies = parseCookies(context);
  const token = cookies.token;

  try {
    const decoded = verify(token, "thisisasecret");
    return { props: { user: decoded.user } };
  } catch (err) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}

export default Dashboard;
