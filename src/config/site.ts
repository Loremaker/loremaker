import type { Metadata, Viewport } from "next";

export const siteName = "MemeGen";

export const heroDescription = "Generate your coin memes ";

const seoDescription = "MemeGen - Generate your coin memes";
const keywords = ["MemeGen", "AI", "Memes", "Crypto", "Meme"];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // colorScheme: "light",
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "#fff" },
  //   { media: "(prefers-color-scheme: dark)", color: "#040916" },
  // ],
};

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: "%s | " + siteName,
  },
  metadataBase: new URL("https://memegen.fun"),
  keywords: keywords,
  description: seoDescription,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/img/icon.png",
    apple: "/img/icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://memegen.fun",
    title: siteName,
    description: heroDescription,
    siteName: siteName,
    images: [
      {
        url: "/img/logo-318x85.png",
        width: 318,
        height: 85,
        alt: "alt text",
      },
      {
        url: "/img/icon.png",
        width: 64,
        height: 52,
        alt: "alt text",
      },
      {
        url: "/img/icon-logo-1231x1049.png",
        width: 1231,
        height: 1049,
        alt: "alt text",
      },
      {
        url: "/img/icon-1024x1024.png",
        width: 1024,
        height: 1024,
        alt: "alt text",
      },
    ],
  },
};
