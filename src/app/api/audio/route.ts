import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { captureException } from "@sentry/nextjs";

const audioRequestSchema = z.object({
  text: z.string({ required_error: "Text is required" }),
  speaker: z.string({ required_error: "Speaker is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const parsed = audioRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { text, speaker } = parsed.data;
    const audioResponse = await fetch(
      "https://someone45--libritts-v1-libritts-predict.modal.run",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, speaker }),
      }
    );

    if (!audioResponse.ok) {
      throw new Error(`API responded with status: ${audioResponse.status}`);
    }

    const rawAudioResponse = await audioResponse.text();
    const audioData = Buffer.from(rawAudioResponse, "base64");
    // @ts-expect-error - It's a buffer...
    return new Response(audioData, {
      status: 200,
      headers: {
        "Content-Type": "audio/wav",
        // @ts-expect-error - It's a buffer...
        "Content-Length": audioData.length.toString(),
        "Cache-Control": "public, max-age=31536000", // Cache for 1 year
      },
    });
  } catch (error) {
    console.error("[Audio Generation Error]:", error);
    captureException(error);

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json(
      {
        error: "Audio generation failed",
        details: errorMessage,
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
