export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

export const IS_MOBILE = () => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const LOADING_MESSAGES = [
  "No rizz? Loading some...",
  "No bitches? Working on it...",
  "Bussin' through the system",
  "SHEEEESH still thinking",
  "Getting rekt, gimme a sec fam",
  "Dead ass loading rn",
  "Ratio'd by loading time",
  "My brother in Christ, I'm cooking",
  "Down bad in the database",
  "Sus loading detected",
  "On God, we almost there",
  "No cap, still thinking",
];
