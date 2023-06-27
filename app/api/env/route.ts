import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
  });
}

export const runtime = "nodejs";
