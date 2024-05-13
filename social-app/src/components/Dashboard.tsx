import React, { useState, useEffect } from "react";
import Router from "next/router";
import { Button, Divider, Image, Input } from "semantic-ui-react";
import { parseCookies, destroyCookie } from "nookies";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = ({ user }) => {
  console.log(`USER:`, user)
  const [allSet, setAllSet] = useState(false);
  const [busy, setBusy] = useState(false);

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
      setBusy(true);
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
        setAllSet(Boolean(inputData.duelist_address));
      } else {
        setAllSet(false);
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
    setBusy(false);
  }

  const retrieveAccountDetails = async () => {
    try {
      const discord_id = user.id;
      if (!discord_id) {
        console.error("User id is undefined");
        return;
      }
      setBusy(true);

      const url = '/api/fetch_id?' + new URLSearchParams({ discord_id })
      const response = await axios.get(url);
      const { data } = response;

      if (data) {
        const { duelist_address } = data;
        if (duelist_address) {
          setInputData({ ...inputData, duelist_address });
          toast.success("Wallet retrieved successfully.");
          setAllSet(Boolean(duelist_address));
          setBusy(false);
          return;
        }
      }
      console.error("Invalid data format");
      toast.error("Failed to retrieve wallet.");
    } catch (error) {
      console.error("Error retrieving account details:", error);
      toast.error("Failed to retrieve wallet.");
    }
    setAllSet(false);
    setBusy(false);
  }

  const avatarUrl =
    user && user.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
      : "/default-avatar.png";

  return (
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
          <Divider hidden />
          <span className="wallet-container">
            <Button onClick={() => handleLogout()} className="logoutbutton">
              Logout
            </Button>
          </span>

          <Divider />

          <form>
            <div className="form-group">
              <label htmlFor="duelist_address" className="TitleCase">Duelist Address:</label>
              <Input
                className="form-control FillWidth"
                type="text"
                id="duelist_address"
                name="duelist_address"
                value={inputData.duelist_address}
                onChange={handleChange}
                disabled={busy}
              />
            </div>
          </form>

          {allSet && <p className="TitleCase">All Set!</p>}

          <span className="wallet-container">
            <Button disabled={busy} onClick={() => retrieveAccountDetails()} className="walletbutton">
              Retrieve Wallet
            </Button>
            <Button disabled={busy} onClick={(e) => handleSubmit(e)} type="submit" className="walletbutton">
              Save Wallet
            </Button>
          </span>
        </>
      ) : (
        <h5>You are not logged in.</h5>
      )}
    </div>
  );
}

export default Dashboard;
