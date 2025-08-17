"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Eye, Users, MessageSquare, BarChart3, ArrowUp, ArrowDown, Info } from "lucide-react"
import { useProfileStore } from "@/lib/store/profile-store"

// Mock data for demo
const weeklyData = [
  { day: 'Mon', views: 12 },
  { day: 'Tue', views: 18 },
  { day: 'Wed', views: 22 },
  { day: 'Thu', views: 28 },
  { day: 'Fri', views: 35 },
  { day: 'Sat', views: 20 },
  { day: 'Sun', views: 15 },
]

const metrics = [
  {
    title: "Profile Views",
    value: 150,
    change: 23,
    trend: "up",
    icon: Eye,
    description: "Total views this week"
  },
  {
    title: "Search Appearances", 
    value: 89,
    change: -5,
    trend: "down",
    icon: TrendingUp,
    description: "Times appeared in search"
  },
  {
    title: "Connection Requests",
    value: 12,
    change: 8,
    trend: "up", 
    icon: Users,
    description: "New connection requests"
  },
  {
    title: "Messages Received",
    value: 7,
    change: 3,
    trend: "up",
    icon: MessageSquare,
    description: "InMails and messages"
  }
]

const topKeywords = [
  { keyword: "Software Engineer", count: 45 },
  { keyword: "React", count: 38 },
  { keyword: "JavaScript", count: 32 },
  { keyword: "Full Stack", count: 28 },
  { keyword: "Node.js", count: 24 },
]

export default function AnalyticsPage() {
  const { currentProfile } = useProfileStore()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track your LinkedIn profile performance and engagement
        </p>
      </div>

      {!currentProfile && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Import your profile to start tracking analytics and performance metrics.
          </AlertDescription>
        </Alert>
      )}

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metric.description}
              </p>
              <div className="flex items-center mt-2">
                {metric.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4 text-green-600 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-red-600 mr-1" />
                )}
                <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {Math.abs(metric.change)}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Your profile engagement over the last 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="views" className="space-y-4">
            <TabsList>
              <TabsTrigger value="views">Profile Views</TabsTrigger>
              <TabsTrigger value="search">Search Appearances</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            <TabsContent value="views" className="space-y-4">
              <div className="h-[200px] flex items-end justify-between gap-2">
                {weeklyData.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary rounded-t"
                      style={{ height: `${(day.views / 35) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="search">
              <div className="text-center py-12 text-muted-foreground">
                Search appearance data will be displayed here
              </div>
            </TabsContent>
            <TabsContent value="engagement">
              <div className="text-center py-12 text-muted-foreground">
                Engagement metrics will be displayed here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Keywords */}
        <Card>
          <CardHeader>
            <CardTitle>Top Search Keywords</CardTitle>
            <CardDescription>
              Keywords that led to your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topKeywords.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.keyword}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                    <Badge variant="secondary" className="w-16 justify-center">
                      {Math.round((item.count / 45) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Profile Strength */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Optimization Score</CardTitle>
            <CardDescription>
              Based on AI analysis of your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Score</span>
                <span className="text-2xl font-bold">
                  {currentProfile?.analysis?.overallScore || 65}%
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Headline</span>
                  <span className="text-muted-foreground">Good</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Summary</span>
                  <span className="text-muted-foreground">Needs Work</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '45%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Experience</span>
                  <span className="text-muted-foreground">Excellent</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Growth Recommendations
          </CardTitle>
          <CardDescription>
            Actions to improve your profile visibility
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert>
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Add more skills:</strong> Profiles with 5+ skills get 17x more views
              </AlertDescription>
            </Alert>
            <Alert>
              <Users className="h-4 w-4" />
              <AlertDescription>
                <strong>Expand your network:</strong> Connect with 10+ people in your industry this week
              </AlertDescription>
            </Alert>
            <Alert>
              <MessageSquare className="h-4 w-4" />
              <AlertDescription>
                <strong>Post regularly:</strong> Share industry insights to increase engagement by 5x
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}