"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Briefcase,
  Target,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Loader2,
  TrendingUp,
  Link as LinkIcon,
  FileText,
  ArrowRight
} from "lucide-react"
import { useProfileStore } from "@/lib/store/profile-store"

interface JobMatch {
  score: number
  missingKeywords: string[]
  suggestions: string[]
  tailoredContent: {
    headline: string
    summary: string
    skills: string[]
  }
}

export default function JobMatchingPage() {
  const { currentProfile } = useProfileStore()
  const [jobUrl, setJobUrl] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [jobMatch, setJobMatch] = useState<JobMatch | null>(null)
  const [activeTab, setActiveTab] = useState("url")

  const analyzeJobMatch = async () => {
    setIsAnalyzing(true)
    setJobMatch(null)

    try {
      const response = await fetch('/api/jobs/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobUrl: activeTab === 'url' ? jobUrl : null,
          jobDescription: activeTab === 'paste' ? jobDescription : null,
          profile: currentProfile
        })
      })

      if (response.ok) {
        const data = await response.json()
        setJobMatch(data.match)
      }
    } catch (error) {
      console.error('Job analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const applyTailoredContent = async () => {
    if (!jobMatch) return

    // This would update the profile with tailored content
    console.log('Applying tailored content:', jobMatch.tailoredContent)
  }

  if (!currentProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Profile Required</AlertTitle>
          <AlertDescription>
            Please <a href="/dashboard/import" className="underline">import your profile</a> before using job matching.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Job Matching</h1>
        <p className="text-muted-foreground mt-2">
          Tailor your profile for specific job opportunities
        </p>
      </div>

      {/* Job Input */}
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            Provide the job posting you want to optimize for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">
                <LinkIcon className="mr-2 h-4 w-4" />
                Job URL
              </TabsTrigger>
              <TabsTrigger value="paste">
                <FileText className="mr-2 h-4 w-4" />
                Paste Description
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div>
                <Label htmlFor="jobUrl">LinkedIn Job URL</Label>
                <Input
                  id="jobUrl"
                  type="url"
                  placeholder="https://www.linkedin.com/jobs/view/..."
                  value={jobUrl}
                  onChange={(e) => setJobUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste the URL of the LinkedIn job posting
                </p>
              </div>
            </TabsContent>

            <TabsContent value="paste" className="space-y-4">
              <div>
                <Label htmlFor="jobDescription">Job Description</Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the full job description here..."
                  rows={10}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            className="w-full mt-4"
            onClick={analyzeJobMatch}
            disabled={isAnalyzing || (!jobUrl && !jobDescription)}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Match...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Analyze Job Match
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Match Results */}
      {jobMatch && (
        <>
          {/* Match Score */}
          <Card>
            <CardHeader>
              <CardTitle>Match Score</CardTitle>
              <CardDescription>
                How well your profile matches this job
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{jobMatch.score}%</span>
                  <Badge 
                    variant={jobMatch.score >= 75 ? "default" : jobMatch.score >= 50 ? "secondary" : "destructive"}
                  >
                    {jobMatch.score >= 75 ? "Strong Match" : jobMatch.score >= 50 ? "Good Match" : "Needs Work"}
                  </Badge>
                </div>
                <Progress value={jobMatch.score} className="h-3" />
              </div>

              {jobMatch.score < 75 && (
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    Applying our suggestions could increase your match score to {Math.min(jobMatch.score + 20, 95)}%
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Missing Keywords */}
          {jobMatch.missingKeywords.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Missing Keywords</CardTitle>
                <CardDescription>
                  Important keywords from the job description not in your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {jobMatch.missingKeywords.map((keyword, index) => (
                    <Badge key={index} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle>Optimization Suggestions</CardTitle>
              <CardDescription>
                Specific changes to improve your match score
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {jobMatch.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Tailored Content */}
          <Card>
            <CardHeader>
              <CardTitle>Tailored Profile Content</CardTitle>
              <CardDescription>
                AI-optimized content for this specific job
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Optimized Headline</Label>
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm">{jobMatch.tailoredContent.headline}</p>
                </div>
              </div>

              <div>
                <Label>Optimized Summary</Label>
                <div className="mt-2 p-3 bg-muted rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{jobMatch.tailoredContent.summary}</p>
                </div>
              </div>

              <div>
                <Label>Recommended Skills to Highlight</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {jobMatch.tailoredContent.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full"
                onClick={applyTailoredContent}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Apply to Profile Editor
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}