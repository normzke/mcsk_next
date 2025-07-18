'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl text-blue-600 mb-8">
            <i className="fas fa-newspaper"></i>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Sorry, we couldn't find the article you're looking for. It may have been moved or deleted.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/news">
              <Button variant="default">
                <i className="fas fa-newspaper mr-2"></i>
                Browse News
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <i className="fas fa-home mr-2"></i>
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 