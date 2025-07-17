'use client'

import { useState } from "react"
import Image from "next/image"
import PageHeader from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Mail, Phone, Linkedin } from "lucide-react"

export default function LeadershipContent({ initialData }: { initialData: any }) {
  const [selectedMember, setSelectedMember] = useState<any>(null)
  
  // Add fallback data for faster loading
  const fallbackData = {
    hero: {
      title: "Board & Management",
      description: "Meet the dedicated leaders guiding MCSK's mission to protect and promote music rights in Kenya.",
      image: "/images/leadership-hero.jpg"
    },
    boardMembers: [
      {
        id: "chairman",
        name: "Dr. Ezekiel Mutua",
        position: "Chairman",
        image: "/images/leadership/chairman.jpg",
        bio: "Dr. Ezekiel Mutua is a seasoned administrator with extensive experience in media and communications. He has been instrumental in advocating for the rights of content creators and ensuring fair compensation for their work. As Chairman of MCSK, he leads the Board in setting strategic direction and ensuring good governance of the organization.",
        expertise: ["Media & Communications", "Copyright Advocacy", "Strategic Leadership"],
        contact: {
          email: "chairman@mcsk.or.ke",
          phone: "+254 XXX XXX XXX"
        },
        quote: "Our mission is to ensure that every musician in Kenya receives fair compensation for their creative work and intellectual property."
      }
    ],
    managementTeam: [],
    commitment: {
      title: "Our Leadership Commitment",
      description: "MCSK's leadership team is committed to transparency, innovation, and excellence in serving our members and protecting music rights in Kenya.",
      values: []
    }
  };
  
  const { boardMembers, managementTeam, commitment } = initialData || fallbackData

  return (
    <main className="min-h-screen">
      <PageHeader
        title={initialData?.hero?.title || fallbackData.hero.title}
        description={initialData?.hero?.description || fallbackData.hero.description}
        image={initialData?.hero?.image || fallbackData.hero.image}
      />

      {/* MCSK Chairman */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1a1464] mb-12 text-center">Our Leadership</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <h3 className="text-xl md:text-2xl font-bold text-[#1a1464] p-4 md:p-6 text-center border-b border-gray-100">MCSK Chairman</h3>
              <div className="grid md:grid-cols-2">
                <div className="h-100 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img src="/images/board/Dr. Lazarus Muoki Muli.jpg" alt="Dr. Lazarus Muoki Muli" className="w-full h-full object-cover" />
                </div>
                <div className="p-8 flex flex-col justify-center bg-white">
                  <h4 className="text-2xl font-semibold mb-3 text-[#1a1464]">Dr. Lazarus Muoki Muli</h4>
                  <p className="text-gray-600 mb-6">MCSK Chairman</p>
                  <p className="text-gray-700">Leading MCSK's mission to protect and promote the rights of music creators in Kenya.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Board of Directors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {boardMembers.map((member: any, index: number) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                  <div className="space-y-4">
                    <p className="text-slate-600 line-clamp-3">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise && member.expertise.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger className="text-blue-600 hover:text-blue-700 font-medium mt-4 block">
                      View Profile →
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{member.name}</DialogTitle>
                        <DialogDescription>
                          <div className="mt-4 space-y-4">
                            <p className="text-slate-600">{member.bio}</p>
                            <div className="space-y-2">
                              {member.contact?.email && (
                                <div className="flex items-center">
                                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                                  <a
                                    href={`mailto:${member.contact.email}`}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {member.contact.email}
                                  </a>
                                </div>
                              )}
                              {member.contact?.phone && (
                                <div className="flex items-center">
                                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                                  <span>{member.contact.phone}</span>
                                </div>
                              )}
                              {member.contact?.linkedin && (
                                <div className="flex items-center">
                                  <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                                  <a
                                    href={member.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    LinkedIn Profile
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Management Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {managementTeam && managementTeam.length > 0 ? managementTeam.map((member: any, index: number) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                  <div className="space-y-4">
                    <p className="text-slate-600 line-clamp-3">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise && member.expertise.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger className="text-blue-600 hover:text-blue-700 font-medium mt-4 block">
                      View Profile →
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{member.name}</DialogTitle>
                        <DialogDescription>
                          <div className="mt-4 space-y-4">
                            <p className="text-slate-600">{member.bio}</p>
                            <div className="space-y-2">
                              {member.contact?.email && (
                                <div className="flex items-center">
                                  <Mail className="h-5 w-5 mr-2 text-blue-600" />
                                  <a
                                    href={`mailto:${member.contact.email}`}
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    {member.contact.email}
                                  </a>
                                </div>
                              )}
                              {member.contact?.phone && (
                                <div className="flex items-center">
                                  <Phone className="h-5 w-5 mr-2 text-blue-600" />
                                  <span>{member.contact.phone}</span>
                                </div>
                              )}
                              {member.contact?.linkedin && (
                                <div className="flex items-center">
                                  <Linkedin className="h-5 w-5 mr-2 text-blue-600" />
                                  <a
                                    href={member.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-700"
                                  >
                                    LinkedIn Profile
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </Card>
            )) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500">No management team members available at this time.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Leadership Commitment */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{commitment?.title || "Our Leadership Commitment"}</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            {commitment?.description || "MCSK's leadership team is committed to transparency, innovation, and excellence in serving our members and protecting music rights in Kenya."}
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {commitment?.values && commitment.values.length > 0 ? commitment.values.map((value: any, index: number) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur border-white/20">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-blue-100">
                  {value.description}
                </p>
              </Card>
            )) : (
              <div className="col-span-3 text-center py-6">
                <p className="text-blue-100">Our commitment to excellence drives everything we do at MCSK.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}