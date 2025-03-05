"use client"

import { DeploymentHelperDev } from "@/components/deployment-helper-dev"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, FileCode, Server, Globe } from "lucide-react"

export default function DevPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Application
          </Link>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl">Developer Tools</CardTitle>
            <CardDescription>Tools and resources for deploying and managing your application</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Server className="h-5 w-5 mr-2 text-blue-500" />
                  Deployment
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                Deploy your application to various hosting platforms
              </CardContent>
              <CardFooter>
                <DeploymentHelperDev />
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileCode className="h-5 w-5 mr-2 text-green-500" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                View documentation and troubleshooting guides
              </CardContent>
              <CardFooter>
                <div className="space-y-2 w-full">
                  <a href="/TROUBLESHOOTING.md" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Troubleshooting Guide
                    </Button>
                  </a>
                  <a href="/README.md" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      README
                    </Button>
                  </a>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-purple-500" />
                  Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                External resources and documentation
              </CardContent>
              <CardFooter>
                <div className="space-y-2 w-full">
                  <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Next.js Docs
                    </Button>
                  </a>
                  <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Vercel Docs
                    </Button>
                  </a>
                </div>
              </CardFooter>
            </Card>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>This page is only visible in development mode and won't be accessible to end users.</p>
        </div>
      </div>
    </div>
  )
}

