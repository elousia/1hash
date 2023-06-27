"use client";

import { Icons } from "@/components/icons";
import { useEffect, useState } from "react";

type PassageAuthEnvValuesType = {
  appID?: string;
  apiKey?: string;
};

export default function SignIn() {
  const [passageAuthEnvValues, setPassageAuthEnvValues] =
    useState<PassageAuthEnvValuesType>({});

  /* isMounted state is added to insure that the 
   passage-auth element is getting the appID */
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    require("@passageidentity/passage-elements/passage-auth");

    const fetechEnvValues = async () => {
      const response = await fetch("/api/auth/passageAuth/envValues");
      const data = await response.json();
      setPassageAuthEnvValues(data);
    };
    fetechEnvValues();
  }, []);

  // if (!isMounted) {
  //   return (
  //     <div className="max-w-3xl mx-auto flex justify-center flex-col h-[60%]">
  //       <div className="mt-10">
  //         <Icons.spinner className="w-4 h-4 animate-spin" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mt-10">
        <passage-auth app-id={process.env.PASSAGE_APP_ID}></passage-auth>
      </div>
    </div>
  );
}
