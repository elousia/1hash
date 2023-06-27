import { NextApiRequest, NextApiResponse } from "next";

export default async function passageENV(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    appID: process.env.PASSAGE_APP_ID,
    apiKey: process.env.PASSAGE_API_KEY,
  });
}
