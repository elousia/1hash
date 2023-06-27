import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Passage from "@passageidentity/passage-node";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const appID = process.env.PASSAGE_APP_ID as string;
  const passage = new Passage({
    appID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER",
  });

  const authToken = cookieStore.get("psg_auth_token")?.value;
  try {
    const request = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };
    // @ts-ignore
    const userId = await passage.authenticateRequest(request);
    if (userId) {
      // user is authenticated
      const { email, phone } = await passage.user.get(userId);
      const identifier = email ? email : phone;

      return NextResponse.json({
        isAuthorized: true,
        username: identifier,
        userId,
      });
    }
  } catch (error) {
    // authentication failed
    return NextResponse.json({
      isAuthorized: false,
      username: "",
    });
  }
}

export const runtime = "nodejs";
