'use client'

import Image from "next/image"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Target, History, Users, Award, MapPin, Mail, Phone } from "lucide-react"

type TeamMember = {
  id: string
  name: string
  position: string
  bio: string
  image: string
  contact?: {
    email: string
    phone: string
  }
}

type Achievement = {
  year: string
  title: string
  description: string
  icon: string
}

type AboutData = {
  hero: {
    title: string
    description: string
    image: string
  }
  mission: {
    statement: string
    vision: string
    values: Array<{
      title: string
      description: string
    }>
  }
  history: {
    description: string
    timeline: Array<{
      year: string
      title: string
      description: string
    }>
  }
  team: {
    description: string
    leadership: TeamMember[]
    board: TeamMember[]
  }
  achievements: Achievement[]
  offices: Array<{
    name: string
    address: string
    phone: string
    email: string
  }>
}

export default function AboutContent({ initialData }: { initialData: AboutData | null }) {
  if (!initialData) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Error Loading About Content
            </h1>
            <p className="text-slate-600">
              Sorry, we couldn't load the about content. Please try again later.
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData.hero.title}
        description={initialData.hero.description}
        image={initialData.hero.image}
      />

      {/* Mission and Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-xl text-slate-600">{initialData.mission.statement}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Our Vision</h3>
              <p className="text-lg text-slate-600 text-center mb-12">
                {initialData.mission.vision}
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {initialData.mission.values.map((value, index) => (
                  <div key={index} className="text-center">
                    <h4 className="text-lg font-bold mb-2">{value.title}</h4>
                    <p className="text-slate-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <History className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our History</h2>
            <p className="text-slate-600">{initialData.history.description}</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-blue-200 md:left-1/2"></div>
              {initialData.history.timeline.map((event, index) => (
                <div key={index} className="relative flex items-center mb-8 md:justify-between">
                  <div className={`flex items-center md:w-1/2 ${
                    index % 2 === 0 ? 'md:justify-end' : ''
                  }`}>
                    <div className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold">
                      {index + 1}
                    </div>
                    <div className={`ml-4 ${
                      index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}>
                      <span className="block text-sm text-blue-600 font-semibold mb-1">
                        {event.year}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-slate-600">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-slate-600">{initialData.team.description}</p>
          </div>
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="leadership" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="leadership">Leadership Team</TabsTrigger>
                <TabsTrigger value="board">Board of Directors</TabsTrigger>
              </TabsList>
              <TabsContent value="leadership">
                <div className="grid md:grid-cols-3 gap-8">
                  {initialData.team.leadership.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <div className="relative h-64">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                        <p className="text-slate-600 mb-4">{member.bio}</p>
                        {member.contact && (
                          <div className="space-y-2 text-sm text-slate-500">
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-2" />
                              {member.contact.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-2" />
                              {member.contact.phone}
                            </div>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="board">
                <div className="grid md:grid-cols-3 gap-8">
                  {initialData.team.board.map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <div className="relative h-64">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                        <p className="text-slate-600">{member.bio}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {initialData.achievements.map((achievement, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {achievement.icon === 'award' && <Award className="h-8 w-8 text-blue-600" />}
                      {achievement.icon === 'users' && <Users className="h-8 w-8 text-blue-600" />}
                      {achievement.icon === 'target' && <Target className="h-8 w-8 text-blue-600" />}
                    </div>
                    <div>
                      <span className="text-sm text-blue-600 font-semibold block mb-1">
                        {achievement.year}
                      </span>
                      <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                      <p className="text-slate-600">{achievement.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Our Offices</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {initialData.offices.map((office, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-4">{office.name}</h3>
                  <div className="space-y-3 text-slate-600">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-3 mt-1" />
                      <p>{office.address}</p>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-3" />
                      <p>{office.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-blue-600 mr-3" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 