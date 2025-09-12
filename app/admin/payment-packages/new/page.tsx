import { Metadata } from 'next'
import PaymentPackageForm from '../_components/payment-package-form'

export const metadata: Metadata = {
  title: 'Add Payment Package - Admin Dashboard',
  description: 'Add a new payment package',
}

export default function NewPaymentPackagePage() {
  return <PaymentPackageForm />
} 