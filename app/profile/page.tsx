"use client";

import { useEffect, useState } from "react";
import Button from "@/components/button";
import { Icons } from "@/components/icons";

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  async function passageAuthentication() {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();

      //console.log("data", data)
      const { isAuthorized, username } = data;

      if (isAuthorized) {
        setLoggedIn(true);
        setUsername(username);
        console.log("User is authorized: ", isAuthorized);
      } else {
        // User is not authorized
        //console.log('User is not authorized with appID:', appID);
        setLoggedIn(false);
        window.location.href = "/";
      }
    } catch (error) {
      // Handle the error
      console.error("Error occurred while checking authorization:", error);
    }
  }

  useEffect(() => {
    console.log("inside useEffect");
    require("@passageidentity/passage-elements/passage-auth");
    const fetchDataAndAuthenticate = async () => {
      try {
        await passageAuthentication(); // Assuming passageAuthentication is an async function
      } catch (error) {
        // Handle any errors that occur during passageAuthentication or fetchData
        // Set loading to false even if an error occurs
        console.error(error);
      }
    };

    fetchDataAndAuthenticate(); // Call the function to fetch data and authenticate when the component mounts

    const clearLocalStorage = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", clearLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, []);

  const handleLogout = async () => {
    document.cookie = "psg_auth_token=; max-age=0; path=/;";
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col mx-auto max-w-3xl items-center w-full h-full mt-8">
      <h2 className="py-4 text-5xl w-full font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-5xl">
        Profile
      </h2>

      <p className="text-zinc-400">
        You are logged in as: <span className="font-semibold">{username}</span>
      </p>

      <div className="mx-auto max-w-xl">
        <Button
          classes={`w-full flex items-center justify-center mt-6`}
          type="button"
          onClick={handleLogout}
        >
          <Icons.logout className="h-4" aria-hidden="true" />
          <span className="inline-block ml-1">Log out of session</span>
        </Button>
      </div>
    </div>
  );
}
