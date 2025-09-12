import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import SocialMediaForm from '../../_components/social-media-form'

export const metadata: Metadata = {
  title: 'Edit Social Media - Admin Dashboard',
  description: 'Edit social media handle',
}

interface EditSocialMediaPageProps {
  params: {
    id: string
  }
}

async function getSocialMedia(id: string) {
  const socialMedia = await prisma.socialMedia.findUnique({
    where: { id },
  })

  if (!socialMedia) {
    notFound()
  }

  return socialMedia
}

export default async function EditSocialMediaPage({ params }: EditSocialMediaPageProps) {
  const socialMedia = await getSocialMedia(params.id)

  return <SocialMediaForm initialData={socialMedia} />
} 