"use client";

import { useEffect, useState } from "react";

import Button from "@/components/button";
import { Icons } from "@/components/icons";
import Link from "next/link";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  async function passageAuthentication() {
    try {
      const response = await fetch("/api/auth");
      const data = await response.json();

      //console.log("data", data)
      const { isAuthorized } = data;

      if (isAuthorized) {
        setLoggedIn(true);
        console.log("User is authorized: ", isAuthorized);
      } else {
        // User is not authorized
        //console.log('User is not authorized with appID:', appID);
        setLoggedIn(false);
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

  return (
    <section className="flex flex-col items-center justify-center max-w-3xl px- mx-auto sm:min-h-[85vh] sm:px-0">
      <div className="text-center mt-24 sm:mt-0 lg:-mt-28">
        <h2 className="py-4 text-4xl xs:text-5xl font-bold tracking-tight capitalize text-center text-transparent bg-gradient-to-b bg-clip-text from-zinc-900/20 to-zinc-600/50 sm:text-7xl">
          Safely exchange environment variables
        </h2>
        <p className="text-sm xs:text-base">
          Safeguarded within your browser, your secret undergoes encryption
          prior to storage for a restricted duration, ensuring secure read
          operations. Rest assured, unencrypted data remains exclusively within
          your browser environment.
        </p>
        {loggedIn ? (
          <Link passHref href={"/encrypt"} className="my-7 flex justify-center">
            <Button>
              <Icons.key className="mr-2 h-4 w-4" />
              Encrypt documents
            </Button>
          </Link>
        ) : (
          <Link passHref href={"/login"} className="my-7 flex justify-center">
            <Button>
              <Icons.key className="mr-2 h-4 w-4" />
              Continue with Passage
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
}
