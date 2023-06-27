import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { generateId } from "@/modules/id";

interface IRequest {
  encrypted: string;
  ttl?: number;
  reads: number;
  iv: string;
}

const redis = Redis.fromEnv();

export async function POST(req: Request) {
  const { encrypted, ttl, reads, iv } = (await req.json()) as IRequest;

  const id = generateId();
  const key = ["1hash", id].join(":");

  const tx = redis.multi();

  tx.hset(key, {
    remainingReads: reads > 0 ? reads : null,
    encrypted,
    iv,
  });
  if (ttl) {
    tx.expire(key, ttl);
  }
  tx.incr("1hash:metrics:writes");

  await tx.exec();

  return NextResponse.json({ id });
}

export const runtime = "nodejs";
