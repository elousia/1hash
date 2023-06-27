import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "Missing `id` parameter" },
        { status: 400 }
      );
    }

    const redisKey = ["1hash", id].join(":");

    const [data, _] = await Promise.all([
      await redis.hgetall<{ secret: string; remainingReads: number | null }>(
        redisKey
      ),
      await redis.incr("1hash:metrics:reads"),
    ]);

    if (!data) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    if (data.remainingReads !== null && data.remainingReads < 1) {
      await redis.del(redisKey);
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    let remainingReads: number | null = null;
    if (data.remainingReads !== null) {
      // Decrement the number of reads and return the remaining reads
      remainingReads = await redis.hincrby(redisKey, "remainingReads", -1);
    }

    return NextResponse.json({
      data: {
        secret: data.secret,
        remainingReads: remainingReads ?? undefined,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
