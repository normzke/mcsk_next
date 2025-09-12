'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Phone, CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

interface PaymentFormProps {
  member: any
  transaction: any
}

export default function PaymentForm({ member, transaction }: PaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState(member.phone || '')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success' | 'failed'>('pending')
  const router = useRouter()

  const handlePayment = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number')
      return
    }

    setIsProcessing(true)
    setPaymentStatus('processing')

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: transaction.id,
          phoneNumber: phoneNumber,
          amount: transaction.amount,
          description: `MCSK Membership - ${member.name}`,
          memberId: member.id,
          packageId: transaction.packageId,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`Payment failed: ${response.status} ${errorText}`)
      }

      const result = await response.json()

      if (result.success) {
        setPaymentStatus('success')
        toast.success('Payment request sent! Please check your phone for M-Pesa prompt.')
        
        // Simulate payment completion (in production, this would be handled by callback)
        setTimeout(() => {
          router.push('/membership/success')
        }, 5000)
      } else {
        throw new Error(result.error || 'Payment failed')
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error('Payment request timed out. Please try again.')
      } else {
        console.error('Payment error:', error)
        toast.error(error instanceof Error ? error.message : 'Payment failed')
      }
      setPaymentStatus('failed')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Application Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
            Application Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Applicant</Label>
              <p className="text-gray-900">{member.name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Membership Type</Label>
              <p className="text-gray-900 capitalize">{member.membershipType}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Amount</Label>
              <p className="text-gray-900 font-semibold">
                KES {transaction.amount?.toLocaleString()}
              </p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Package</Label>
              <p className="text-gray-900">{transaction.package?.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Payment Details
          </CardTitle>
          <CardDescription>
            Complete your payment using M-Pesa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                M-Pesa Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="254700000000"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the phone number registered with M-Pesa
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Payment Instructions</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Ensure your phone has sufficient M-Pesa balance</li>
                    <li>• You will receive an M-Pesa prompt on your phone</li>
                    <li>• Enter your M-Pesa PIN when prompted</li>
                    <li>• Payment will be processed automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={isProcessing || paymentStatus === 'processing'}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Pay KES {transaction.amount?.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Status */}
      {paymentStatus === 'processing' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
              <div>
                <h4 className="font-medium text-blue-900">Processing Payment</h4>
                <p className="text-sm text-blue-700">
                  Please check your phone for the M-Pesa prompt and complete the payment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentStatus === 'success' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <h4 className="font-medium text-green-900">Payment Successful</h4>
                <p className="text-sm text-green-700">
                  Your payment has been processed successfully. Redirecting to success page...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {paymentStatus === 'failed' && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
              <div>
                <h4 className="font-medium text-red-900">Payment Failed</h4>
                <p className="text-sm text-red-700">
                  There was an issue processing your payment. Please try again.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 