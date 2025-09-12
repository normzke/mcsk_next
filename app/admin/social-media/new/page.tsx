import { Metadata } from 'next'
import SocialMediaForm from '../_components/social-media-form'

export const metadata: Metadata = {
  title: 'Add Social Media - Admin Dashboard',
  description: 'Add a new social media handle',
}

export default function NewSocialMediaPage() {
  return <SocialMediaForm />
} 