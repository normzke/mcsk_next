import { Metadata } from 'next'
import MpesaCredentialsForm from '../_components/mpesa-credentials-form'

export const metadata: Metadata = {
  title: 'Add M-Pesa Credentials - Admin Dashboard',
  description: 'Add new M-Pesa API credentials',
}

export default function NewMpesaCredentialsPage() {
  return <MpesaCredentialsForm />
} 