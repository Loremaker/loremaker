import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, speaker, custom_speaker } = body;

    // Construct the data payload
    const data = custom_speaker
      ? { text, custom_speaker }
      : { text, speaker };

    const response = await fetch(
      'https://someone45--libritts-v1-libritts-predict.modal.run',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    // API returns raw text
    const rawResponse = await response.text();

    // We need to decode the base64 response to get the audio data
    const audioData = Buffer.from(rawResponse, 'base64');

    return new Response(audioData, {
      status: response.status,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioData.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error details:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong', details: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
