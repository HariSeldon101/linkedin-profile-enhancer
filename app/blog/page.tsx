"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Sparkles, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

const blogPosts = [
  {
    title: "10 LinkedIn Profile Mistakes That Cost You Jobs",
    excerpt: "Discover the most common LinkedIn profile mistakes that prevent you from getting noticed by recruiters and how to fix them.",
    date: "Jan 15, 2025",
    readTime: "5 min read",
    category: "Optimization"
  },
  {
    title: "The Power of Keywords: ATS Optimization Guide",
    excerpt: "Learn how to optimize your LinkedIn profile with the right keywords to pass ATS filters and rank higher in recruiter searches.",
    date: "Jan 12, 2025",
    readTime: "8 min read",
    category: "SEO"
  },
  {
    title: "How AI is Revolutionizing Career Development",
    excerpt: "Explore how artificial intelligence is changing the job search landscape and what it means for your career.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    category: "Technology"
  },
  {
    title: "Networking in 2025: Digital Strategies That Work",
    excerpt: "Master the art of digital networking with proven strategies for building meaningful professional connections online.",
    date: "Jan 8, 2025",
    readTime: "7 min read",
    category: "Networking"
  },
  {
    title: "From Profile to Interview: Success Stories",
    excerpt: "Real stories from professionals who transformed their careers using ProfileBoost's optimization strategies.",
    date: "Jan 5, 2025",
    readTime: "10 min read",
    category: "Success Stories"
  },
  {
    title: "The Psychology of a Perfect LinkedIn Headline",
    excerpt: "Understanding the psychology behind what makes recruiters click on your profile and how to craft the perfect headline.",
    date: "Jan 3, 2025",
    readTime: "5 min read",
    category: "Psychology"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatedBackgroundSubtle />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-6 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  ProfileBoost
                </span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    Home
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <BookOpen className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Insights & Tips</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Career Insights
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Expert advice and strategies for LinkedIn success
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}