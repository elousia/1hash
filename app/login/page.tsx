"use client";

// Had a couple issues with Passage auth, fixed by reading this blog:
// https://mecvino-coding.hashnode.dev/how-to-add-passage-authentication-in-nextjs

import { useEffect, useState } from "react";

type PassageCredentials = {
  appID?: string;
  apiKey?: string;
};

export default function SignIn() {
  const [passageCredentials, setPassageCredentials] =
    useState<PassageCredentials>({});

  /* isMounted state is added to insure that the 
   passage-auth element is getting the appID */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    require("@passageidentity/passage-elements/passage-auth");

    const getEnv = async () => {
      const response = await fetch("/api/v1/env/get");
      const data = await response.json();
      setPassageCredentials(data);
    };
    getEnv();
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mt-10">
        {isMounted && passageCredentials.appID ? (
          <passage-auth app-id={passageCredentials.appID}></passage-auth>
        ) : null}
      </div>
    </div>
  );
}
