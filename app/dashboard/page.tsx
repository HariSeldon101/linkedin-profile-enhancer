"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Users, 
  Eye, 
  MessageSquare,
  ArrowRight,
  Upload,
  Edit3,
  Target,
  AlertCircle
} from "lucide-react"
import Link from "next/link"
import { useUser } from "@/lib/hooks/use-user"
import { useProfileStore } from "@/lib/store/profile-store"

const stats = [
  { label: "Profile Views", value: "0", change: "+0%", icon: Eye },
  { label: "Search Appearances", value: "0", change: "+0%", icon: TrendingUp },
  { label: "Connections", value: "0", change: "+0", icon: Users },
  { label: "Messages", value: "0", change: "+0", icon: MessageSquare },
]

const quickActions = [
  {
    title: "Import Your Profile",
    description: "Upload LinkedIn PDF or paste your profile data",
    icon: Upload,
    href: "/dashboard/import",
    color: "text-blue-600"
  },
  {
    title: "Edit Profile",
    description: "Use our WYSIWYG editor to optimize your profile",
    icon: Edit3,
    href: "/dashboard/editor",
    color: "text-green-600"
  },
  {
    title: "Match Jobs",
    description: "Tailor your profile for specific job postings",
    icon: Target,
    href: "/dashboard/jobs",
    color: "text-purple-600"
  }
]

export default function DashboardPage() {
  const { user, loading } = useUser()
  const { currentProfile } = useProfileStore()
  const [profileScore, setProfileScore] = useState(0)

  useEffect(() => {
    if (currentProfile?.analysis) {
      setProfileScore(currentProfile.analysis.overallScore || 0)
    }
  }, [currentProfile])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Welcome back{user?.name ? `, ${user.name}` : ''}!</h1>
        <p className="text-muted-foreground mt-2">
          {currentProfile 
            ? "Your profile is loaded. Let's optimize it for maximum visibility."
            : "Start by importing your LinkedIn profile to get personalized recommendations."}
        </p>
      </div>

      {/* Profile Status Alert */}
      {!currentProfile && (
        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader>
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="flex-1">
                <CardTitle className="text-lg">No Profile Imported Yet</CardTitle>
                <CardDescription className="mt-1">
                  Import your LinkedIn profile to unlock AI-powered optimization, job matching, and analytics.
                </CardDescription>
              </div>
              <Link href="/dashboard/import">
                <Button size="sm">Import Now</Button>
              </Link>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Profile Score */}
      {currentProfile && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Score</CardTitle>
            <CardDescription>Your LinkedIn profile optimization score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-4xl font-bold">{profileScore}%</div>
                <p className="text-sm text-muted-foreground">
                  {profileScore < 50 ? "Needs improvement" : 
                   profileScore < 75 ? "Good, but can be better" : 
                   "Excellent profile!"}
                </p>
              </div>
              <div className="relative h-24 w-24">
                <svg className="h-24 w-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(profileScore / 100) * 226} 226`}
                    className="text-primary transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <action.icon className={`h-8 w-8 ${action.color}`} />
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="mt-4">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest profile optimization activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentProfile ? (
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">Profile imported</span>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-muted-foreground">AI analysis completed</span>
                  <span className="text-xs text-muted-foreground">2 minutes ago</span>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No activity yet. Import your profile to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}