import { LogoText } from "@/components/logo-text";
import { ContractAddress } from "./contract-address";

export function Header() {
  return (
    <header className="max-w-[1560px] mx-auto mb-4 top-0 left-0 right-0 bg-transparent backdrop-blur-lg py-6 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between h-auto lg:h-16 gap-4 lg:gap-0">
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="text-4xl lg:text-5xl font-bold">
              <LogoText />
            </div>
            <p className="text-sm text-muted-foreground">
              Create your own crazy tales for your meme coins
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4">
            <ContractAddress address="6vnADQaqkxTnwcBcZGG7USh5EA6SMtdr6pYXc8Ldmoon" />
            <nav className="flex items-center gap-x-4">
              <a
                href="/tokenomics"
                className="px-4 py-1.5 text-sm text-muted-foreground hover:text-primary transition-all
                border border-border/40 bg-gray-900 rounded-md hover:bg-gray-800/90
                hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                Tokenomics
              </a>
              <a
                href="/roadmap"
                className="px-4 py-1.5 text-sm text-muted-foreground hover:text-primary transition-all
                border border-border/40 bg-gray-900 rounded-md hover:bg-gray-800/90
                hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                Roadmap
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-400 hover:text-gray-200 transition-all"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#">
                <svg
                  viewBox="0 0 98 96"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 fill-gray-400 hover:fill-gray-200 transition-all"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                  />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
