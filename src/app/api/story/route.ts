import { type NextRequest, NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";

import { RateLimiter } from "@/lib/rate-limiter";

import { contractAddressSchema, getCoinData, streamStory } from "../utils";

export const dynamic = "force-dynamic";
export const maxDuration = 30;


export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for");
  if (!ip) {
    return NextResponse.json({ error: "No IP was found" }, { status: 400 });
  }

  const rateLimiter = RateLimiter({
    requests: 20,
    period: "30 s",
  });
  const { success, reset } = await rateLimiter.limit(ip);
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000).toString();
    return NextResponse.json(
      {
        error: "Too many requests",
        code: "RATE_LIMIT",
        retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": retryAfter },
      }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const parsed = contractAddressSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid request body",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const { contractAddress } = parsed.data;
  try {
    const { error, coin } = await getCoinData(contractAddress);
    if (error || !coin) {
      return NextResponse.json({ error }, { status: 404 });
    }
    return streamStory(coin);
  } catch (error) {
    console.error(error);
    captureException(error, {
      extra: {
        contractAddress,
      },
    });

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
