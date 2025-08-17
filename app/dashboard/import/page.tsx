"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  Upload, 
  FileText, 
  Clipboard, 
  Globe,
  Info,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useProfileStore } from "@/lib/store/profile-store"

export default function ImportProfilePage() {
  const router = useRouter()
  const { setProfile } = useProfileStore()
  const [activeTab, setActiveTab] = useState("pdf")
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState("")
  
  // Form states
  const [manualData, setManualData] = useState({
    headline: "",
    summary: "",
    experience: "",
    education: "",
    skills: "",
    certifications: ""
  })
  const [profileUrl, setProfileUrl] = useState("")

  // PDF Upload Handler
  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setUploadStatus('idle')
    setStatusMessage("Processing your LinkedIn PDF...")

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/profile/import-pdf', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadStatus('success')
        setStatusMessage("Profile imported successfully!")
        setProfile(data.profile)
        
        // Redirect to editor after successful import
        setTimeout(() => {
          router.push('/dashboard/editor')
        }, 2000)
      } else {
        setUploadStatus('error')
        setStatusMessage(data.error || "Failed to process PDF")
      }
    } catch (error) {
      setUploadStatus('error')
      setStatusMessage("Error uploading file. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  // Manual Form Submit
  const handleManualSubmit = async () => {
    setIsProcessing(true)
    setStatusMessage("Processing your profile data...")

    try {
      const response = await fetch('/api/profile/import-manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualData),
      })

      const data = await response.json()

      if (response.ok) {
        setUploadStatus('success')
        setStatusMessage("Profile created successfully!")
        setProfile(data.profile)
        
        setTimeout(() => {
          router.push('/dashboard/editor')
        }, 2000)
      } else {
        setUploadStatus('error')
        setStatusMessage(data.error || "Failed to create profile")
      }
    } catch (error) {
      setUploadStatus('error')
      setStatusMessage("Error processing profile data")
    } finally {
      setIsProcessing(false)
    }
  }

  // URL Scraping Handler
  const handleUrlSubmit = async () => {
    setIsProcessing(true)
    setStatusMessage("Fetching profile from LinkedIn...")

    try {
      const response = await fetch('/api/profile/import-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: profileUrl }),
      })

      const data = await response.json()

      if (response.ok) {
        setUploadStatus('success')
        setStatusMessage("Profile scraped successfully!")
        setProfile(data.profile)
        
        setTimeout(() => {
          router.push('/dashboard/editor')
        }, 2000)
      } else {
        setUploadStatus('error')
        setStatusMessage(data.error || "Failed to scrape profile")
      }
    } catch (error) {
      setUploadStatus('error')
      setStatusMessage("Error fetching profile data")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Import Your LinkedIn Profile</h1>
        <p className="text-muted-foreground mt-2">
          Choose how you&apos;d like to import your profile data for optimization
        </p>
      </div>

      {/* How It Works */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>How Profile Import Works</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>Since LinkedIn restricts API access, we offer three alternative methods:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>PDF Export:</strong> Download your LinkedIn profile as PDF and upload it here</li>
            <li><strong>Manual Input:</strong> Copy and paste your profile sections manually</li>
            <li><strong>Web Scraping:</strong> Provide your profile URL (requires public profile)</li>
          </ul>
          <p className="mt-2">All methods are secure and your data is encrypted.</p>
        </AlertDescription>
      </Alert>

      {/* Import Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Import Method</CardTitle>
          <CardDescription>Select your preferred import method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pdf">
                <FileText className="mr-2 h-4 w-4" />
                PDF Upload
              </TabsTrigger>
              <TabsTrigger value="manual">
                <Clipboard className="mr-2 h-4 w-4" />
                Manual Input
              </TabsTrigger>
              <TabsTrigger value="url">
                <Globe className="mr-2 h-4 w-4" />
                Web Scraping
              </TabsTrigger>
            </TabsList>

            {/* PDF Upload Tab */}
            <TabsContent value="pdf" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">How to export your LinkedIn profile as PDF:</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Go to your LinkedIn profile</li>
                    <li>Click &quot;More&quot; button below your profile headline</li>
                    <li>Select &quot;Save to PDF&quot;</li>
                    <li>Upload the downloaded PDF here</li>
                  </ol>
                </div>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  {isDragActive ? (
                    <p>Drop your LinkedIn PDF here...</p>
                  ) : (
                    <div>
                      <p className="font-semibold">Drag & drop your LinkedIn PDF here</p>
                      <p className="text-sm text-muted-foreground mt-2">or click to browse</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Manual Input Tab */}
            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="headline">Professional Headline</Label>
                  <Input
                    id="headline"
                    placeholder="e.g., Senior Software Engineer at Tech Company"
                    value={manualData.headline}
                    onChange={(e) => setManualData({...manualData, headline: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="summary">About/Summary</Label>
                  <Textarea
                    id="summary"
                    placeholder="Paste your LinkedIn summary here..."
                    rows={4}
                    value={manualData.summary}
                    onChange={(e) => setManualData({...manualData, summary: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Work Experience</Label>
                  <Textarea
                    id="experience"
                    placeholder="Paste your work experience (one per line)..."
                    rows={6}
                    value={manualData.experience}
                    onChange={(e) => setManualData({...manualData, experience: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="education">Education</Label>
                  <Textarea
                    id="education"
                    placeholder="Paste your education details..."
                    rows={3}
                    value={manualData.education}
                    onChange={(e) => setManualData({...manualData, education: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    placeholder="List your skills (comma-separated)..."
                    rows={2}
                    value={manualData.skills}
                    onChange={(e) => setManualData({...manualData, skills: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleManualSubmit} 
                  disabled={isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Import Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            {/* URL Scraping Tab */}
            <TabsContent value="url" className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  This method works best with public LinkedIn profiles. Make sure your profile is set to public visibility.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="profileUrl">LinkedIn Profile URL</Label>
                  <Input
                    id="profileUrl"
                    type="url"
                    placeholder="https://www.linkedin.com/in/your-profile"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                  />
                </div>

                <Button 
                  onClick={handleUrlSubmit} 
                  disabled={isProcessing || !profileUrl}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Fetching Profile...
                    </>
                  ) : (
                    <>
                      Scrape Profile
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Status Messages */}
      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Alert variant={uploadStatus === 'error' ? 'destructive' : 'default'}>
            {uploadStatus === 'success' && <CheckCircle className="h-4 w-4" />}
            {uploadStatus === 'error' && <AlertCircle className="h-4 w-4" />}
            {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
            <AlertDescription>{statusMessage}</AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  )
}