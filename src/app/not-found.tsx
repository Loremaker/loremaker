import Link from "next/link";

import { Button } from "@/components/ui/button";

export default async function NotFound() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900/30 to-blue-800/30">
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <span className="text-[40rem] font-bold text-white select-none">
          404
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-slate-400 mb-8 max-w-md">
          We can&apos;t find the page that you&apos;re looking for. Probably the
          link is broken
        </p>
        <div className="flex flex-col md:flex-row gap-2">
          <Link href="/">
            <Button>Take me home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
