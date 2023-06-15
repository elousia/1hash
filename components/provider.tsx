import React from "react";
import Nav from "./nav";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      {children}
    </>
  );
}
