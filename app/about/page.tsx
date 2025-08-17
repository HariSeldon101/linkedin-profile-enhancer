"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Sparkles, Users, Target, Rocket, Heart } from "lucide-react"

export default function AboutPage() {
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
              <Heart className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Our Story</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Empowering Careers
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Through AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              We believe everyone deserves to be discovered for their true potential
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 mb-12"
          >
            <div className="flex items-center mb-6">
              <Rocket className="w-8 h-8 text-purple-400 mr-4" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              ProfileBoost was founded with a simple yet powerful mission: to democratize career opportunities by helping 
              professionals present their best selves online. We leverage cutting-edge AI technology to analyze, optimize, 
              and enhance LinkedIn profiles, ensuring that talent doesn't go unnoticed in today's competitive job market.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12 mb-12"
          >
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-purple-400 mr-4" />
              <h2 className="text-3xl font-bold">Why We Exist</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Research shows that 87% of recruiters use LinkedIn to find candidates, yet most profiles are poorly optimized. 
              We bridge this gap by providing:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                AI-powered analysis that identifies optimization opportunities
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Industry-specific recommendations based on successful profiles
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Real-time editing tools that make optimization effortless
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">•</span>
                Analytics to track and improve profile performance
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-12"
          >
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-purple-400 mr-4" />
              <h2 className="text-3xl font-bold">Our Team</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              We're a diverse team of engineers, designers, and career experts passionate about helping people succeed. 
              Our team includes former recruiters from top tech companies, AI researchers, and professionals who've 
              experienced firsthand the challenges of job searching in the digital age.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: "50K+", label: "Users Helped" },
              { value: "300%", label: "Avg Profile View Increase" },
              { value: "4.9/5", label: "User Rating" },
              { value: "15M+", label: "Profiles Analyzed" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}