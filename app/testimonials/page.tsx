"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Star, Sparkles, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager at Meta",
    content: "ProfileBoost transformed my LinkedIn profile completely. Within 2 weeks of optimization, I received 5 interview requests from top tech companies. The AI suggestions were spot-on!",
    rating: 5,
    image: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Senior Engineer at Google",
    content: "The job matching feature is incredible. It helped me tailor my profile perfectly for my dream role at Google. I went from 0 recruiter messages to 10+ per week.",
    rating: 5,
    image: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    content: "I was skeptical at first, but the results speak for themselves. My profile views increased by 400% and I landed a director role at a Fortune 500 company.",
    rating: 5,
    image: "ER"
  },
  {
    name: "David Kim",
    role: "Data Scientist at Amazon",
    content: "The keyword optimization is brilliant. It identified gaps in my profile that I never noticed. Now I rank in the top 10 for 'Data Scientist' searches in my area.",
    rating: 5,
    image: "DK"
  },
  {
    name: "Lisa Thompson",
    role: "UX Designer at Apple",
    content: "ProfileBoost's AI helped me showcase my portfolio in a way that caught Apple's attention. The profile editor is intuitive and the suggestions are always relevant.",
    rating: 5,
    image: "LT"
  },
  {
    name: "James Wilson",
    role: "VP of Sales",
    content: "As a sales professional, networking is crucial. ProfileBoost helped me optimize my profile for maximum visibility. I've connected with 100+ decision makers.",
    rating: 5,
    image: "JW"
  }
]

export default function TestimonialsPage() {
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
              <Quote className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Success Stories</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Real Results
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                From Real People
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Join thousands of professionals who've transformed their careers with ProfileBoost
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-semibold">{testimonial.image}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}