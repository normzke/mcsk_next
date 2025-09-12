import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, AlertCircle, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Import Members - MCSK Admin",
  description: "Import members from Excel file",
}

export default function ImportMembersPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Import Members</h2>
          <p className="text-muted-foreground">
            Import members from Excel file
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/admin/members">
            <Button variant="outline">
              Back to Members
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload Excel File
            </CardTitle>
            <CardDescription>
              Upload an Excel file (.xlsx or .xls) with member data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="/api/admin/members/import" method="post" encType="multipart/form-data">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="file">Select Excel File</Label>
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept=".xlsx,.xls"
                    required
                    className="mt-2"
                  />
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Important Notes</h4>
                      <ul className="text-sm text-blue-700 mt-2 space-y-1">
                        <li>• First row should contain column headers</li>
                        <li>• Required fields: name, email</li>
                        <li>• MCSK numbers will be auto-generated if not provided</li>
                        <li>• Duplicate emails will be skipped</li>
                        <li>• Maximum file size: 10MB</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Import Members
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Template Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Download className="mr-2 h-5 w-5" />
              Download Template
            </CardTitle>
            <CardDescription>
              Download the Excel template with sample data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900">Template Features</h4>
                    <ul className="text-sm text-green-700 mt-2 space-y-1">
                      <li>• Pre-filled sample data</li>
                      <li>• All required and optional columns</li>
                      <li>• Proper formatting for dates</li>
                      <li>• Clear column descriptions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Column Reference */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Column Reference</CardTitle>
          <CardDescription>
            Reference for all available columns in the Excel template
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Required Fields</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">name</span>
                  <span className="text-sm font-medium">Full name of the member</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">email</span>
                  <span className="text-sm font-medium">Email address (must be unique)</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Optional Fields</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">phone</span>
                  <span className="text-sm font-medium">Phone number</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">address</span>
                  <span className="text-sm font-medium">Physical address</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">city</span>
                  <span className="text-sm font-medium">City</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">country</span>
                  <span className="text-sm font-medium">Country (default: Kenya)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">idNumber</span>
                  <span className="text-sm font-medium">National ID number</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">membershipType</span>
                  <span className="text-sm font-medium">composer, publisher, successor</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">status</span>
                  <span className="text-sm font-medium">pending, active, suspended</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">membershipNumber</span>
                  <span className="text-sm font-medium">Auto-generated if not provided</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">bio</span>
                  <span className="text-sm font-medium">Biography or description</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">bankName</span>
                  <span className="text-sm font-medium">Bank name</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">bankAccount</span>
                  <span className="text-sm font-medium">Bank account number</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">mpesaNumber</span>
                  <span className="text-sm font-medium">M-Pesa phone number</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">dateOfBirth</span>
                  <span className="text-sm font-medium">YYYY-MM-DD format</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
} 