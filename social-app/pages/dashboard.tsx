import { useState, useEffect } from "react";
import Router from "next/router";
import { Button, Image } from "semantic-ui-react";
import { parseCookies, destroyCookie } from "nookies";
import { JwtPayload, verify } from "jsonwebtoken";
import { toast } from "react-toastify";
import axios from "axios";
import App from "@/components/App";

const Dashboard = ({ user }) => {
  const [inputData, setInputData] = useState({
    duelist_address: user?.duelist_address || "",
  });

  useEffect(() => {
    retrieveAccountDetails()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  }

  const handleLogout = () => {
    destroyCookie(null, "token");
    Router.push("/api/logout");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = parseCookies().token;
      const response = await fetch("/api/upsert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          discord_id: user.id,
          duelist_address: inputData.duelist_address,
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
  }

  const retrieveAccountDetails = async () => {
    try {
      const discord_id = user.id;
      if (!discord_id) {
        console.error("User id is undefined");
        return;
      }

      const url = '/api/fetch_id?' + new URLSearchParams({ discord_id })
      const response = await axios.get(url);
      const { data } = response;

      if (data) {
        const { duelist_address } = data;
        if (duelist_address) {
          setInputData({ ...inputData, duelist_address });
          toast.success("Wallet retrieved successfully.");
          return;
        }
      }
      console.error("Invalid data format");
      toast.error("Failed to retrieve wallet.");
    } catch (error) {
      console.error("Error retrieving account details:", error);
      toast.error("Failed to retrieve wallet.");
    }
  }

  const avatarUrl =
    user && user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : "/default-avatar.png";

  return (
    <App>
      <div className="AlignCenter">
        {user ? (
          <>
            <h1>Welcome, {user.username}</h1>
            {/* <p>Email: {user.email}</p> */}
            <p>Discord ID: {user.id}</p>
            <span className="AlignCenter">
              <Image
                src={avatarUrl}
                alt="User Avatar"
                className="Profilepicture"
              />
            </span>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="duelist_address" className="TitleCase">Duelist Address:</label>
                <input
                  className="form-control FillWidth"
                  type="text"
                  id="duelist_address"
                  name="duelist_address"
                  value={inputData.duelist_address}
                  onChange={handleChange}
                />
              </div>
            </form>
            <span className="wallet-container">
              <Button onClick={() => retrieveAccountDetails()} className="walletbutton">
                Retrieve Wallet
              </Button>
              <Button type="submit" className="walletbutton">
                Save Wallet
              </Button>
            </span>
            <span className="wallet-container">
              <Button onClick={() => handleLogout()} className="logoutbutton">
                Logout
              </Button>
            </span>
          </>
        ) : (
          <h5>You are not logged in.</h5>
        )}
      </div>
    </App>
  );
}

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
export default Dashboard;
