export const runtime = "nodejs";

import Passage from "@passageidentity/passage-node";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID as string,
    apiKey: process.env.PASSAGE_API_KEY as string,
    authStrategy: "COOKIE",
  });
  try {
    const authToken = request.cookies.has("psg_auth_token");
    const req = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
    const userId = await passage.authenticateRequest(req);
    if (userId) {
      return NextResponse.json({
        userId,
      });
    }
  } catch (err) {}
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/encrypt"],
};
