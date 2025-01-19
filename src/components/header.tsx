import { LogoText } from "@/components/logo-text";
import { ContractAddress } from "./contract-address";

export function Header() {
  return (
    <header className="max-w-[1560px] mx-auto fixed top-0 left-0 right-0 bg-background py-5 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-16 gap-4 lg:gap-0">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="text-4xl lg:text-5xl font-bold">
              <LogoText />
            </div>
            <p className="text-sm text-muted-foreground">
              Create your own crazy tales for your meme coins!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <ContractAddress address="6vnADQaqkxTnwcBcZGG7USh5EA6SMtdr6pYXc8Ldmoon" />
            <nav className="flex items-center gap-x-4">
              <a
                href="/tokenomics"
                className="px-4 py-1.5 text-sm text-muted-foreground hover:text-primary transition-all
                border border-border/40 bg-gray-900 rounded-full hover:bg-gray-800/90
                hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                Tokenomics
              </a>
              <a
                href="/roadmap"
                className="px-4 py-1.5 text-sm text-muted-foreground hover:text-primary transition-all
                border border-border/40 bg-gray-900 rounded-full hover:bg-gray-800/90
                hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                Roadmap
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-300 hover:text-gray-200 transition-all"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
