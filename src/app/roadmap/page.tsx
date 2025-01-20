import {
  LockOpenIcon as LockClosedIcon,
  RocketIcon,
  SparklesIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Roadmap() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Project Roadmap</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phase 1 */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RocketIcon className="h-5 w-5 text-blue-500" />
                <span>Phase 1: Launch</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={100} className="h-2 bg-slate-800" />
              <div className="space-y-2">
                <p className="text-blue-400">Launch</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Generate Epic Fantasy themed stories</li>
                  <li>Store stories locally</li>
                  <li>Narrate stories with AI voices</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Phase 2 */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SparklesIcon className="h-5 w-5 text-emerald-500" />
                <span>Phase 2: Configuration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={30} className="h-2 bg-slate-800" />
              <div className="space-y-2">
                <p className="text-emerald-400">3 weeks</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Download stories in different formats</li>
                  <li>Download stories with narrated audio</li>
                  <li>Customize story settings</li>
                  <li>Upload custom voice</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Phase 3 */}
          <Card className="border-slate-800 bg-slate-900/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LockClosedIcon className="h-5 w-5 text-orange-500" />
                <span>Phase 3: Innovation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={5} className="h-2 bg-slate-800" />
              <div className="space-y-2">
                <p className="text-orange-400">2 months</p>
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  <li>Share stories with community</li>
                  <li>Collaborative story editing</li>
                  <li>AI generated illustrations per story</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
