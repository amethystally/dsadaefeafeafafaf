"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, AlertCircle, Server, Globe, Github } from "lucide-react"

// This component is only for development use
// It's not imported in the main application for production
export function DeploymentHelperDev() {
  const [copied, setCopied] = useState<string | null>(null)
  const [showHelper, setShowHelper] = useState(false)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  if (!showHelper) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setShowHelper(true)}
          className="rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600"
        >
          <Server className="h-5 w-5 mr-2" />
          Deployment Help
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Deployment Helper</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setShowHelper(false)}>
              ✕
            </Button>
          </div>
          <CardDescription>Instructions for deploying this application to various hosting platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-300">
              If you're seeing 404 errors or blank pages, follow these instructions to properly deploy the application.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="vercel">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="vercel">Vercel</TabsTrigger>
              <TabsTrigger value="netlify">Netlify</TabsTrigger>
              <TabsTrigger value="static">Other Static Hosts</TabsTrigger>
            </TabsList>

            <TabsContent value="vercel" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Push your code to GitHub</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make sure your code is in a GitHub repository.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">2. Import to Vercel</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Go to{" "}
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    vercel.com/new
                  </a>{" "}
                  and import your GitHub repository.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">3. Deploy with default settings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Vercel will automatically detect Next.js and configure everything correctly.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Deploy Command</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard("npx vercel", "vercel-cmd")}
                    className="h-8"
                  >
                    {copied === "vercel-cmd" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-xs mt-2 overflow-x-auto">npx vercel</pre>
              </div>
            </TabsContent>

            <TabsContent value="netlify" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Push your code to GitHub</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Make sure your code is in a GitHub repository.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">2. Import to Netlify</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Go to{" "}
                  <a
                    href="https://app.netlify.com/start"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline"
                  >
                    app.netlify.com/start
                  </a>{" "}
                  and import your GitHub repository.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">3. Configure build settings</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Build command:</div>
                    <div className="font-mono">npm run build</div>
                    <div className="font-medium">Publish directory:</div>
                    <div className="font-mono">out</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">4. Add environment variables</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">STATIC_EXPORT:</div>
                    <div className="font-mono">true</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">netlify.toml Configuration</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      copyToClipboard(
                        `[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  STATIC_EXPORT = "true"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,
                        "netlify-config",
                      )
                    }
                    className="h-8"
                  >
                    {copied === "netlify-config" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <pre className="text-xs mt-2 overflow-x-auto">
                  [build] command = "npm run build" publish = "out" [build.environment] STATIC_EXPORT = "true"
                  [[redirects]] from = "/*" to = "/index.html" status = 200
                </pre>
              </div>
            </TabsContent>

            <TabsContent value="static" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Option 1: Build for static hosting</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Build Command</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("STATIC_EXPORT=true npm run build", "static-build")}
                      className="h-8"
                    >
                      {copied === "static-build" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-xs mt-2 overflow-x-auto">STATIC_EXPORT=true npm run build</pre>
                  <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                    Then upload the contents of the 'out' directory to your hosting provider.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Option 2: Use the standalone HTML version</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  For simple static hosting, you can use the standalone HTML version:
                </p>
                <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Upload the files from the 'public' directory</li>
                  <li>Rename 'index-static.html' to 'index.html'</li>
                  <li>Make sure to include styles.css and script.js</li>
                </ol>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">GitHub Pages</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">GitHub Pages Deployment Script</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(
                          `#!/bin/bash
# Build the project
STATIC_EXPORT=true npm run build

# Create a temporary directory for GitHub Pages
rm -rf gh-pages-branch
mkdir gh-pages-branch
cp -r out/* gh-pages-branch/

# Add a .nojekyll file to bypass Jekyll processing
touch gh-pages-branch/.nojekyll

# Create or update the gh-pages branch
cd gh-pages-branch
git init
git add .
git commit -m "Deploy to GitHub Pages"
git branch -M gh-pages
git remote add origin https://github.com/yourusername/your-repo.git
git push -f origin gh-pages

# Clean up
cd ..
rm -rf gh-pages-branch

echo "Deployed to GitHub Pages!"`,
                          "gh-pages-script",
                        )
                      }
                      className="h-8"
                    >
                      {copied === "gh-pages-script" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="text-xs mt-2 overflow-x-auto">
                    #!/bin/bash # Build the project STATIC_EXPORT=true npm run build # Create a temporary directory for
                    GitHub Pages rm -rf gh-pages-branch mkdir gh-pages-branch cp -r out/* gh-pages-branch/ # Add a
                    .nojekyll file to bypass Jekyll processing touch gh-pages-branch/.nojekyll # Create or update the
                    gh-pages branch cd gh-pages-branch git init git add . git commit -m "Deploy to GitHub Pages" git
                    branch -M gh-pages git remote add origin https://github.com/yourusername/your-repo.git git push -f
                    origin gh-pages # Clean up cd .. rm -rf gh-pages-branch echo "Deployed to GitHub Pages!"
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setShowHelper(false)}>
              Close
            </Button>
            <a href="https://github.com/yourusername/your-repo/issues" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4 mr-2" />
                Report Issues
              </Button>
            </a>
          </div>
          <a href="https://vercel.com/docs/concepts/deployments/overview" target="_blank" rel="noopener noreferrer">
            <Button size="sm">
              <Globe className="h-4 w-4 mr-2" />
              Deployment Docs
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

