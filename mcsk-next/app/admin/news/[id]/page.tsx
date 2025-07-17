import { Metadata } from "next"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Edit, Trash2 } from "lucide-react"
import { News } from "../columns"

export const metadata: Metadata = {
  title: "View News Article - MCSK Admin",
  description: "View news article details",
}

async function getNewsArticle(id: string): Promise<News | null> {
  // TODO: Implement API call
  return null
}

export default async function ViewNewsPage({
  params,
}: {
  params: { id: string }
}) {
  const news = await getNewsArticle(params.id)

  if (!news) {
    notFound()
  }

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{news.title}</h2>
          <p className="text-muted-foreground">
            {news.excerpt}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href={`/admin/news/${news.id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Article
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Article
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Article Information */}
        <Card>
          <CardHeader>
            <CardTitle>Article Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              {news.image ? (
                <div className="relative h-20 w-32 rounded overflow-hidden">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-32 items-center justify-center rounded bg-muted">
                  <span className="text-sm text-muted-foreground">No image</span>
                </div>
              )}
              <div>
                <h3 className="font-semibold">{news.title}</h3>
                <p className="text-sm text-muted-foreground">{news.category}</p>
              </div>
            </div>

            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Category</p>
                <Badge variant="outline" className="mt-1">
                  {news.category}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge variant={news.is_active ? "success" : "secondary"} className="mt-1">
                  {news.is_active ? "Published" : "Draft"}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Featured</p>
                <Badge variant={news.is_featured ? "default" : "outline"} className="mt-1">
                  {news.is_featured ? "Yes" : "No"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Publishing Information */}
        <Card>
          <CardHeader>
            <CardTitle>Publishing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <div>
                <p className="text-sm font-medium">Published Date</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(news.published_at), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Created At</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(news.created_at), "PPP")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(news.updated_at), "PPP")}
                </p>
              </div>
              {news.tags.length > 0 && (
                <div>
                  <p className="text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {news.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }} />
          </CardContent>
        </Card>
      </div>
    </>
  )
} 