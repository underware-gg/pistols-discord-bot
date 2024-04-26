import { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Router from "next/router";
import { parseCookies, destroyCookie } from "nookies";
import { JwtPayload, verify } from "jsonwebtoken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import App from "@/components/App";

const Dashboard = ({ user }) => {
  const [walletAddresses, setWalletAddresses] = useState({
    duelist: user?.duelist || "",
  });

  useEffect(() => {
    retrieveAccountDetails()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWalletAddresses({ ...walletAddresses, [name]: value });
  };

  const handleLogout = () => {
    destroyCookie(null, "token");
    Router.push("/api/logout");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = parseCookies().token;
      const response = await fetch("/api/databaseops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          discord_id: user.id,
          duelist: walletAddresses.duelist,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        if (response.status === 401) {
          toast.error("Unauthorized access. Please log in again.");
        } else if (response.status === 404) {
          toast.error("Resource not found.");
        } else {
          toast.error("Failed to save wallet.");
        }
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to save data.");
    }
  };

  const retrieveAccountDetails = async () => {
    try {
      const id = user.id;
      if (!id) {
        console.error("User id is undefined");
        return;
      }
      const token = parseCookies().token;
      const response = await fetch("/api/fetchAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const accountDetails = data[0];
        const duelistAddress = accountDetails.duelist_address;

        setWalletAddresses({ ...walletAddresses, duelist: duelistAddress });
        toast.success("Wallet retrieved successfully.");
      } else {
        console.error("Invalid data format");
        toast.error("Failed to retrieve wallet.");
      }
    } catch (error) {
      console.error("Error retrieving account details:", error);
      toast.error("Failed to retrieve wallet.");
    }
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
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="walletbutton">
                Save Wallet
              </Button>
            </form>
            <span className="wallet-container">
              <Button onClick={() => retrieveAccountDetails()} className="walletbutton">
                Retrieve Wallet
              </Button>
              <Button onClick={() => handleLogout()} className="logoutbutton">
                Logout
              </Button>
            </span>
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
    const decoded = verify(token, "thisisasecret") as JwtPayload;
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
