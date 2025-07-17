'use client'

import { motion } from 'framer-motion'
import HeroSlider from "@/components/hero-slider"
import StatsSection from "@/components/ui/stats-section"
import ServicesGrid from "@/components/ui/services-grid"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type HomeData = {
  hero_slides: Array<{
    id: string
    title: string
    description: string
    image: string
    cta: {
      text: string
      url: string
    }
  }>
  announcements: Array<{
    id: string
    title: string
    content: string
    date: string
  }>
  latest_news: Array<{
    id: string
    title: string
    excerpt: string
    image: string
    date: string
    slug: string
  }>
  partners: Array<{
    id: string
    name: string
    logo: string
    url: string
  }>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function HomeContent({ initialData }: { initialData: HomeData | null }) {
  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading Content
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider slides={initialData.hero_slides} />

      {/* Announcements Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-slate-900 mb-8 text-center heading-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Latest Announcements
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {initialData.announcements.map((announcement) => (
              <motion.div key={announcement.id} variants={itemVariants}>
                <Card className="card-hover card-glass">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{announcement.content}</p>
                    <time className="text-sm text-slate-500">
                      {new Date(announcement.date).toLocaleDateString()}
                    </time>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              className="text-3xl font-bold text-slate-900 heading-gradient"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest News
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/news" className="text-blue-600 hover:text-blue-700 animated-underline">
                View All News →
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {initialData.latest_news.map((article) => (
              <motion.div key={article.id} variants={itemVariants}>
                <Card className="card-hover overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover image-hover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <time className="text-sm text-slate-500">
                        {new Date(article.date).toLocaleDateString()}
                      </time>
                      <Link
                        href={`/news/${article.slug}`}
                        className="text-sm text-blue-600 hover:text-blue-700 animated-underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-slate-900 mb-8 text-center heading-gradient"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Partners
          </motion.h2>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center justify-items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {initialData.partners.map((partner) => (
              <motion.a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="grayscale hover:grayscale-0 transition-all hover:scale-110"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-16 w-auto"
                />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Join MCSK Today
          </motion.h2>
          <motion.p 
            className="text-blue-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Protect your music rights and join Kenya's leading collective management organization.
            Get access to professional support, royalty collection, and a network of industry experts.
          </motion.p>
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild variant="secondary" className="button-glow">
              <Link href="/membership">Become a Member</Link>
            </Button>
            <Button asChild variant="outline" className="bg-transparent text-white hover:bg-white/10 button-glow">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 