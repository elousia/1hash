import React from "react";
import { Toaster } from "react-hot-toast";
import Nav from "./nav";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <Toaster position="bottom-right" />
      {children}
    </>
  );
}
