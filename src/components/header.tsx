import { LogoText } from "@/components/logo-text";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background py-4 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex flex-col justify-center">
            <div className="text-5xl font-bold">
              <LogoText />
            </div>
            <p className="text-sm text-muted-foreground">
              Create your own crazy tales for your meme coins!
            </p>
          </div>

          <nav className="flex items-center gap-x-4">
            <a
              href="/tokenomics"
              className="px-4 py-1.5 text-sm text-muted-foreground hover:text-primary transition-all
              border border-border/40 bg-gray-900 rounded-full hover:bg-gray-800/90
              hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              tokenomics
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
