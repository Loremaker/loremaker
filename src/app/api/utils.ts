import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

import { generateUUID } from "@/lib/utils/uuid";

export const generateStoryPrompt = (coinInfo: CoinMetadata) => `
You are a based crypto-memelord writing in the style of Lord of the Rings, but with heavy internet culture influence. Your task is to create an absolutely legendary story that would make both Tolkien and Reddit proud. Mix epic fantasy with modern meme culture, incorporating these elements:

STORY VIBES:
- Mix "Lord of the Rings" epic style with Reddit/Crypto humor
- Include popular crypto memes like "wen moon", "diamond hands", "WAGMI"
- Reference classic memes like "One does not simply..." or "AND MY AXE!"
- Add dramatic plot twists that turn into jokes
- Include at least one terrible pun about the coin's name
- Make fun of paper hands and FUD spreaders

CHARACTER TYPES:
- The Diamond Hand Hodlers (brave warriors who never sell)
- The FUD-spreading Nazgul (spreading fear in telegram groups)
- Paper Hand Papsworth III (who sold at the bottom)
- Wise NPCs who speak entirely in meme quotes
- A mysterious figure who's "definitely not Satoshi"
- At least one reference to Vitalik or CZ as legendary wizards

EPIC QUEST ELEMENTS:
- Instead of walking to Mordor, they're trying to reach ATH
- The "fellowship of the coin" facing epic challenges
- Bears and Bulls battling in legendary market cycles
- Smart contract audits described as ancient prophecies
- DEX liquidity pools as mystical lakes of power
- Gas fees as treacherous mountain passes

REQUIRED MEME REFERENCES:
- "One does not simply buy the top"
- "HODL you fools!"
- "A wizard is never early or late, he buys precisely when he means to"
- "The beacons of FOMO are lit!"
- "And my bags!"

FORMATTING:
- Write in an over-the-top epic style
- Include absurd metaphors comparing price action to fantasy battles
- Add random ALL CAPS for dramatic effect
- Include at least one ridiculously dramatic prophecy
- End with an absolutely legendary one-liner
- When specifying the value of the coin, use the symbol and the current price in USD

TONE:
- 50% epic fantasy
- 50% crypto meme culture
- 100% entertainment
- Many % good at math

Example verse structure:

When green candles light the charts of old
And diamond hands their tokens hold
The bears shall COPE and FUDders SEETHE
While hodlers win their wealth to YEET

The coin info is:
${JSON.stringify(coinInfo)}

Remember: Make it so epic and memeable that it would make Gandalf say "GG" and Aragorn reply "WAGMI".
`;

export const contractAddressSchema = z
  .object({
    contractAddress: z.string({
      required_error: "Contract address is required",
    }),
  })
  .strict();

export const getCoinData = async (
  contractAddress: string
): Promise<
  { coin: CoinMetadata; error: null } | { coin: null; error: string }
> => {
  const response = await fetch(
    `https://mainnet.helius-rpc.com/?api-key=${process.env.HELIUS_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: generateUUID(),
        method: "getAsset",
        params: {
          id: contractAddress,
        },
      }),
    }
  );

  const data = await response.json();
  if (data?.error) {
    if (data.error?.message.match(/Asset Not Found/i)) {
      return { coin: null, error: "Coin not found" };
    }
    console.error(data.error);
    return { coin: null, error: "Internal server error" };
  }

  return {
    coin: {
      name: data.result.content.metadata.name,
      symbol: data.result.content.metadata.symbol,
      description: data.result.content.metadata.description,
      marketCap: calculateMarketCap(data),
      currentPrice: data.result.token_info.price_info.price_per_token,
    },
    error: null,
  };
};

export const calculateMarketCap = (asset: HeliusAssetResponse): number => {
  // Adjust supply for decimals
  const adjustedSupply =
    asset.result.token_info.supply /
    Math.pow(10, asset.result.token_info.decimals);

  // Calculate market cap
  const marketCap =
    adjustedSupply * asset.result.token_info.price_info.price_per_token;

  return marketCap;
};

export const generateStoryName = async (name: string) => {
  const { response } = await generateText({
    model: openai("gpt-4o"),
    prompt: `Generate a story name for the coin ${name}. Do not prefix it with Title: or anything similar to that.`,
    temperature: 0.7,
  });
  // @ts-expect-error - the actual text is under the "text" key
  return response.messages[0].content[0].text;
};

export const streamStory = async (coinInfo: CoinMetadata) => {
  return streamText({
    model: openai("gpt-4o"),
    prompt: generateStoryPrompt(coinInfo),
    temperature: 0.7,
  }).toTextStreamResponse({
    headers: {
      "Content-Type": "text/plain",
      Connection: "keep-alive",
      "Keep-Alive": "timeout=60",
    },
  });
};
