'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import PageHeader from "@/components/ui/page-header"
import { Badge } from "@/components/ui/badge"
import { 
  Music, 
  Upload, 
  Globe, 
  PlayCircle,
  BarChart, 
  Shield,
  ExternalLink,
  Heart,
  Share2,
  ListMusic
} from "lucide-react"
import Link from "next/link"

type McskWaveData = {
  hero: {
    title: string
    description: string
    image: string
  }
  stats: Array<{
    value: string
    label: string
  }>
  features: Array<{
    icon: string
    title: string
    description: string
  }>
  genres: string[]
  requirements: {
    audio: Array<{
      title: string
      description: string
    }>
    info: Array<{
      title: string
      description: string
    }>
  }
}

export default function McskWaveContent({ initialData }: { initialData: McskWaveData | null }) {
  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading MCSK Wave
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the MCSK Wave content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'play': return PlayCircle
      case 'shield': return Shield
      case 'chart': return BarChart
      case 'heart': return Heart
      default: return Music
    }
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Quick Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialData.stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                <p className="text-slate-600">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://mcskwave.org/register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button className="w-full h-16 text-lg" size="lg">
                Register as an Artist
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a 
              href="https://mcskwave.org/login" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button variant="outline" className="w-full h-16 text-lg" size="lg">
                Login to Upload Music
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {initialData.features.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon)
              return (
                <Card key={index} className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <IconComponent className="h-12 w-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Genres */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Music Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {initialData.genres.map((genre, index) => (
              <Card key={index} className="p-4 hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <Music className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{genre}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upload Requirements</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Audio Requirements</h3>
              <ul className="space-y-3 text-slate-600">
                {initialData.requirements.audio.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <Music className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                    <span>{req.description}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Required Information</h3>
              <ul className="space-y-3 text-slate-600">
                {initialData.requirements.info.map((req, index) => {
                  const IconComponent = index === 0 ? ListMusic :
                                      index === 1 ? Share2 :
                                      index === 2 ? Globe : Shield
                  return (
                    <li key={index} className="flex items-start">
                      <IconComponent className="h-5 w-5 mr-2 mt-0.5 text-blue-600" />
                      <span>{req.description}</span>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Share Your Music?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join MCSK Wave today and be part of Kenya's growing digital music community.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="https://mcskwave.org/register" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full md:w-auto min-w-[200px]"
              >
                Get Started
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
            <a 
              href="https://mcskwave.org/help" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto"
            >
              <Button 
                variant="outline" 
                size="lg"
                className="w-full md:w-auto min-w-[200px] bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              >
                Learn More
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>
    </main>
  )
} 