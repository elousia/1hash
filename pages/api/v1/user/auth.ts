import { NextApiRequest, NextApiResponse } from "next";
import Passage from "@passageidentity/passage-node";

export default async function authAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appID = process.env.PASSAGE_APP_ID as string;
  const passage = new Passage({
    appID,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "HEADER",
  });
  try {
    const authToken = req.cookies["psg_auth_token"];
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

      res.status(200).json({
        isAuthorized: true,
        username: identifier,
        userId,
      });
    }
  } catch (error) {
    // authentication failed
    res.status(500).json({ isAuthorized: false, username: "", appID });
  }
}
