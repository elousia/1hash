import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    project: "1hash",
    authProvider: "Passage",
    domain: "https://1hash.vercel.app",
    hosting: "https://vercel.com",
  });
}
