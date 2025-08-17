"use client"

import { useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Undo,
  Redo,
  Save,
  Sparkles,
  Download,
  AlertCircle,
  CheckCircle,
  Loader2,
  User,
  Briefcase,
  GraduationCap,
  Code,
  FileText
} from "lucide-react"
import { useProfileStore } from "@/lib/store/profile-store"
import { motion } from "framer-motion"

// Editor toolbar component
function EditorToolbar({ editor }: { editor: ReturnType<typeof useEditor> }) {
  if (!editor) return null

  return (
    <div className="border-b p-2 flex items-center space-x-2">
      <Button
        size="sm"
        variant={editor.isActive('bold') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive('italic') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <Button
        size="sm"
        variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive('orderedList') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default function ProfileEditorPage() {
  const { currentProfile, setProfile } = useProfileStore()
  const [isSaving, setIsSaving] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved' | 'error'>('idle')
  const [activeSection, setActiveSection] = useState('headline')
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    headline: currentProfile?.headline || '',
    summary: currentProfile?.summary || '',
    experience: currentProfile?.experience || [],
    education: currentProfile?.education || [],
    skills: currentProfile?.skills || [],
    certifications: currentProfile?.certifications || []
  })

  // Initialize editors for different sections
  const headlineEditor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Enter your professional headline...'
      })
    ],
    content: profileData.headline,
    onUpdate: ({ editor }) => {
      setProfileData(prev => ({ ...prev, headline: editor.getHTML() }))
    }
  })

  const summaryEditor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({
        placeholder: 'Write your professional summary...'
      })
    ],
    content: profileData.summary,
    onUpdate: ({ editor }) => {
      setProfileData(prev => ({ ...prev, summary: editor.getHTML() }))
    }
  })

  // Save profile
  const handleSave = async () => {
    setIsSaving(true)
    setSaveStatus('idle')

    try {
      const response = await fetch('/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData)
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.profile)
        setSaveStatus('saved')
        setTimeout(() => setSaveStatus('idle'), 3000)
      } else {
        setSaveStatus('error')
      }
    } catch (error) {
      setSaveStatus('error')
    } finally {
      setIsSaving(false)
    }
  }

  // AI Optimization
  const handleOptimize = async (section: string) => {
    setIsOptimizing(true)

    try {
      const response = await fetch('/api/profile/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section,
          content: profileData[section as keyof typeof profileData]
        })
      })

      if (response.ok) {
        const data = await response.json()
        
        // Update the specific section with optimized content
        if (section === 'headline' && headlineEditor) {
          headlineEditor.commands.setContent(data.optimized)
        } else if (section === 'summary' && summaryEditor) {
          summaryEditor.commands.setContent(data.optimized)
        }
        
        setProfileData(prev => ({
          ...prev,
          [section]: data.optimized
        }))
      }
    } catch (error) {
      console.error('Optimization error:', error)
    } finally {
      setIsOptimizing(false)
    }
  }

  // Export profile
  const handleExport = () => {
    const dataStr = JSON.stringify(profileData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'linkedin-profile.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (!currentProfile) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No profile loaded. Please <a href="/dashboard/import" className="underline">import your profile</a> first.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Editor</h1>
          <p className="text-muted-foreground mt-2">
            Edit and optimize your LinkedIn profile with AI assistance
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {saveStatus === 'saved' && (
            <Badge variant="outline" className="text-green-600">
              <CheckCircle className="mr-1 h-3 w-3" />
              Saved
            </Badge>
          )}
          <Button
            variant="outline"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Editor Tabs */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="w-full justify-start rounded-none border-b">
              <TabsTrigger value="headline">
                <User className="mr-2 h-4 w-4" />
                Headline
              </TabsTrigger>
              <TabsTrigger value="summary">
                <FileText className="mr-2 h-4 w-4" />
                Summary
              </TabsTrigger>
              <TabsTrigger value="experience">
                <Briefcase className="mr-2 h-4 w-4" />
                Experience
              </TabsTrigger>
              <TabsTrigger value="education">
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger value="skills">
                <Code className="mr-2 h-4 w-4" />
                Skills
              </TabsTrigger>
            </TabsList>

            {/* Headline Section */}
            <TabsContent value="headline" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Professional Headline</h3>
                    <p className="text-sm text-muted-foreground">
                      Your headline is the first thing recruiters see
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOptimize('headline')}
                    disabled={isOptimizing}
                  >
                    {isOptimizing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Optimize with AI
                  </Button>
                </div>
                <div className="border rounded-lg">
                  <EditorToolbar editor={headlineEditor} />
                  <EditorContent 
                    editor={headlineEditor} 
                    className="p-4 min-h-[100px] prose prose-sm max-w-none"
                  />
                </div>
                {currentProfile?.analysis?.suggestions && currentProfile.analysis.suggestions.length > 0 && (
                  <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                      <strong>AI Suggestion:</strong> {currentProfile.analysis.suggestions[0].message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Summary Section */}
            <TabsContent value="summary" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Professional Summary</h3>
                    <p className="text-sm text-muted-foreground">
                      Tell your professional story and highlight your value
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOptimize('summary')}
                    disabled={isOptimizing}
                  >
                    {isOptimizing ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    Optimize with AI
                  </Button>
                </div>
                <div className="border rounded-lg">
                  <EditorToolbar editor={summaryEditor} />
                  <EditorContent 
                    editor={summaryEditor} 
                    className="p-4 min-h-[300px] prose prose-sm max-w-none"
                  />
                </div>
                {currentProfile?.analysis?.suggestions && currentProfile.analysis.suggestions.find(s => s.section === 'summary') && (
                  <Alert>
                    <Sparkles className="h-4 w-4" />
                    <AlertDescription>
                      <strong>AI Suggestion:</strong> {currentProfile.analysis.suggestions.find(s => s.section === 'summary')?.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </TabsContent>

            {/* Experience Section */}
            <TabsContent value="experience" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Work Experience</h3>
                    <p className="text-sm text-muted-foreground">
                      Highlight your achievements and impact
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Add Experience
                  </Button>
                </div>
                {profileData.experience.map((exp: Record<string, unknown>, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-base">{exp.title}</CardTitle>
                      <CardDescription>{exp.company} • {exp.duration}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{exp.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Skills Section */}
            <TabsContent value="skills" className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Skills & Expertise</h3>
                    <p className="text-sm text-muted-foreground">
                      Add relevant skills to improve discoverability
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Add Skill
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* AI Insights Panel */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights</CardTitle>
          <CardDescription>
            Personalized recommendations to improve your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentProfile?.analysis?.keywords?.recommended && (
              <div>
                <p className="text-sm font-medium mb-2">Recommended Keywords:</p>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.analysis.keywords.recommended.map((keyword: string, i: number) => (
                    <Badge key={i} variant="outline">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {currentProfile?.analysis && (
              <Alert>
                <AlertDescription>
                  Optimize your profile by including relevant keywords and quantifiable achievements to stand out to recruiters.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}