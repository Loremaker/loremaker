export async function StreamHandler(
  response: Response,
  {
    onStart = () => console.log("Stream started"),
    onChunk = (chunk: string) => console.log(chunk),
    onError = (error: Error) => console.error(error),
    onFinish = () => console.log("Stream complete"),
    textDecoder = new TextDecoder(),
  }: {
    onStart?: () => void;
    onChunk?: (chunk: string) => void;
    onError?: (error: Error) => void;
    onFinish?: () => void;
    textDecoder?: TextDecoder;
  } = {}
) {
  try {
    if (!response.ok) {
      throw new Error(`Bad response status: ${response.status}`);
    } else if (!response.body) {
      throw new Error("No response body");
    }

    const reader = response.body.getReader();
    let completeText = "";

    onStart();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        onFinish();
        break;
      }

      const chunk = textDecoder.decode(value);
      completeText += chunk;
      onChunk(chunk);
    }

    return completeText;
  } catch (error) {
    onError(error as Error);
    onFinish();
  }
}
