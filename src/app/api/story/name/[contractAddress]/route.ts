import { type NextRequest, NextResponse } from "next/server";
import { get } from "@vercel/edge-config";
import { captureException } from "@sentry/nextjs";

import { RateLimiter } from "@/lib/rate-limiter";

import { generateStoryName, getCoinData } from "../../../utils";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ contractAddress: string }> }
) {
  const ip = request.headers.get("x-forwarded-for");
  if (!ip) {
    return NextResponse.json({ error: "No IP was found" }, { status: 400 });
  }

  const rateLimitRequests = await get("rateLimitRequests");
  const defaultRequests = 20;
  const parsedRequests =
    typeof rateLimitRequests === "string"
      ? parseInt(rateLimitRequests) || defaultRequests
      : defaultRequests;

  const rateLimiter = RateLimiter({
    requests: parsedRequests,
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

  const { contractAddress } = await params;
  if (!contractAddress) {
    return NextResponse.json(
      { error: "Contract address is required" },
      { status: 400 }
    );
  }

  try {
    const coin = await getCoinData(contractAddress);
    const storyName = await generateStoryName(coin.name);
    return NextResponse.json({ storyName });
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
