import Link from "next/link";

export function LogoText() {
  return (
    <div className="inline-flex items-center justify-center">
      <Link href="/">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-400 transition-all duration-300 ease-out hover:opacity-80">
          Meme
        </span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-600 transition-all duration-300 ease-out hover:opacity-80">
          Gen
        </span>
      </Link>
    </div>
  );
}
