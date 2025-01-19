import { LockIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TokenomicsChart } from "./chart";

export default function TokenomicsPage() {
  return (
    <div className="container mx-auto px-4">
      <Card className="max-w-4xl mx-auto bg-gray-900 border-blue-500">
        <CardHeader className="!pb-0 lg:pb-6">
          <CardTitle className="text-3xl font-bold">
            Token Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4">
            <div className="flex justify-center items-center">
              <TokenomicsChart />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl mb-2">Token Burning</h3>
                <p className="text-muted-foreground">
                  Token burning permanently removes tokens from circulation by
                  sending them to an unrecoverable wallet address. This
                  reduction in total supply creates deflationary pressure - as
                  fewer tokens exist, each remaining token represents a larger
                  percentage of the total supply. Given consistent or growing
                  demand, this decreasing supply can lead to price appreciation
                  over time. Every burn transaction is publicly verifiable on
                  the Solana blockchain, providing transparency to the
                  deflationary mechanism.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl">Token Supply</h3>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-lg font-semibold mb-1">
                      <span className="text-blue-500">85%</span>
                      <span>Circulating Supply</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      The majority of tokens are released to the public,
                      ensuring broad distribution and decentralization
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-lg font-semibold mb-1">
                      <span className="text-emerald-500">10%</span>
                      <span>Community Treasury</span>
                      <LockIcon className="h-4 w-4 text-orange-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      To be used for bounties, airdrops, and rewarding
                      contributors who support the ecosystem&apos;s growth
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-lg font-semibold mb-1">
                      <span className="text-orange-500">5%</span>
                      <span>Team</span>
                      <LockIcon className="h-4 w-4 text-orange-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Locked for 1 year to ensure alignment with the
                      project&apos;s long-term goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
