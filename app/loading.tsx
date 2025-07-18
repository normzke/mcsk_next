'use client'

export default function Loading() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-slate-900">Loading...</h2>
          <p className="text-slate-600 mt-2">Please wait while we fetch the page content.</p>
        </div>
      </div>
    </main>
  )
} 