import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

async function getNewsData() {
  const res = await fetch('http://localhost:3000/api/news')
  if (!res.ok) {
    throw new Error('Failed to fetch news data')
  }
  return res.json()
}

function findArticle(data: any, slug: string) {
  if (data.featured.slug === slug) return data.featured

  for (const category of data.categories) {
    const article = category.articles.find((a: any) => a.slug === slug)
    if (article) return article
  }

  const recentArticle = data.recent.find((a: any) => a.slug === slug)
  if (recentArticle) return recentArticle

  return null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getNewsData()
  const article = findArticle(data, params.slug)

  if (!article) {
    return {
      title: 'Article Not Found | MCSK News',
      description: 'The requested article could not be found.',
    }
  }

  return {
    title: `${article.title} | MCSK News`,
    description: article.excerpt,
    keywords: `MCSK news, ${article.category.toLowerCase()}, music industry news Kenya, ${article.title.toLowerCase()}`,
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const data = await getNewsData()
  const article = findArticle(data, params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = data.recent.filter((a: any) => a.slug !== params.slug).slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Article Header */}
      <section className="relative h-[400px] md:h-[500px]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex items-end pb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{article.category}</Badge>
                <span className="text-sm text-slate-200">
                  {format(new Date(article.date), 'MMMM d, yyyy')}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {article.title}
              </h1>
              {article.author && (
                <p className="text-slate-200">
                  By {article.author}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                <p className="text-xl text-slate-600 mb-8">
                  {article.excerpt}
                </p>
                {article.content && (
                  <div className="whitespace-pre-wrap text-slate-600">
                    {article.content}
                  </div>
                )}
              </div>

              {article.tags && (
                <div className="mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">Tags:</span>
                    {article.tags && Array.isArray(article.tags) && article.tags.map((tag: any, index: number) => {
                      // Handle both string tags and object tags
                      const tagKey = typeof tag === 'object' && tag !== null ? tag.id || index : tag;
                      const tagName = typeof tag === 'object' && tag !== null ? tag.name : tag;
                      
                      return (
                        <Badge key={tagKey} variant="outline">
                          {tagName}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  Related Articles
                </h2>
                <div className="space-y-6">
                  {relatedArticles.map((related: any) => (
                    <Card key={related.id} className="hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <Image
                              src={related.image}
                              alt={related.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-4 mb-2">
                              <Badge variant="secondary">{related.category}</Badge>
                              <span className="text-sm text-slate-500">
                                {format(new Date(related.date), 'MMM d, yyyy')}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">
                              {related.title}
                            </h3>
                            <Link href={`/news/${related.slug}`}>
                              <Button variant="link" className="p-0">
                                Read More
                                <i className="fas fa-arrow-right ml-2"></i>
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-12">
                  <Link href="/news">
                    <Button variant="outline" className="w-full">
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to News
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 