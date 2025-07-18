import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const mcskwaveData = {
      hero: {
        title: "MCSK Wave Music Platform",
        description: "Join Kenya's premier music streaming platform for artists and music lovers.",
        image: "/images/mcskwave-hero.jpg"
      },
      stats: [
        {
          value: "3,200+",
          label: "Active Listeners"
        },
        {
          value: "1,700+",
          label: "Registered Artists"
        },
        {
          value: "4.5/5",
          label: "User Rating"
        }
      ],
      features: [
        {
          icon: "play",
          title: "Stream & Share",
          description: "Share your music with fans and get discovered by new listeners across Kenya and beyond."
        },
        {
          icon: "shield",
          title: "Rights Protection",
          description: "Your music is protected through MCSK's robust copyright management system."
        },
        {
          icon: "chart",
          title: "Track Performance",
          description: "Monitor your music's performance with detailed streaming analytics."
        },
        {
          icon: "heart",
          title: "Fan Engagement",
          description: "Connect with your fans through likes, shares, and playlist features."
        }
      ],
      genres: [
        "Traditional/African",
        "Gospel",
        "Choirs",
        "Swahili Songs",
        "Instrumentals",
        "Acapella",
        "Children Songs",
        "Meditation",
        "Hymns"
      ],
      requirements: {
        audio: [
          {
            title: "File Quality",
            description: "High quality WAV or MP3 files (minimum 320kbps)"
          },
          {
            title: "Recording Quality",
            description: "Clear, professional recordings"
          },
          {
            title: "Metadata",
            description: "Proper track titles and artist names in English or Swahili"
          },
          {
            title: "Rights",
            description: "Copyright clearance for all content"
          }
        ],
        info: [
          {
            title: "Track Details",
            description: "Song title and lyrics (if applicable)"
          },
          {
            title: "Collaborators",
            description: "Featured artists and collaborators"
          },
          {
            title: "Classification",
            description: "Genre and language information"
          },
          {
            title: "Rights",
            description: "Copyright ownership details"
          }
        ]
      }
    }

    return NextResponse.json({ data: mcskwaveData })
  } catch (error) {
    console.error('Error in MCSK Wave API:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 