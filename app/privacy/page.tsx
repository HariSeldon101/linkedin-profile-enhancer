"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Shield, Sparkles, Lock, Eye, Database, Server } from "lucide-react"

export default function PrivacyPage() {
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

      {/* Content */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <Shield className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Privacy Policy</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Privacy Matters
            </h1>
            
            <p className="text-xl text-gray-400 mb-12">
              Last updated: January 2025
            </p>

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-semibold">Data Collection</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We collect only the minimum data necessary to provide our services. This includes your LinkedIn profile information 
                  (when you choose to import it), email address, and usage analytics. We never collect sensitive personal information 
                  without your explicit consent.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <div className="flex items-center mb-4">
                  <Lock className="w-6 h-6 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-semibold">Data Security</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Your data is encrypted both in transit and at rest using industry-standard AES-256 encryption. We use secure 
                  cloud infrastructure with regular security audits and comply with GDPR, CCPA, and other privacy regulations.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-semibold">Data Usage</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We use your data solely to provide and improve our LinkedIn optimization services. This includes generating 
                  AI-powered suggestions, tracking your profile performance, and sending you relevant updates. We never sell 
                  your data to third parties.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <div className="flex items-center mb-4">
                  <Server className="w-6 h-6 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-semibold">Third-Party Services</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  We use trusted third-party services including OpenAI for AI analysis, Stripe for payment processing, and 
                  Vercel for hosting. Each of these services has their own privacy policies and security measures in place.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <ul className="space-y-2 text-gray-300">
                  <li>• Access your personal data at any time</li>
                  <li>• Request correction of inaccurate data</li>
                  <li>• Request deletion of your account and data</li>
                  <li>• Export your data in a portable format</li>
                  <li>• Opt-out of marketing communications</li>
                  <li>• Lodge a complaint with supervisory authorities</li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-gray-300 leading-relaxed">
                  If you have any questions about our privacy policy or how we handle your data, please contact our 
                  Data Protection Officer at privacy@profileboost.ai or write to us at:
                </p>
                <p className="text-gray-400 mt-4">
                  ProfileBoost Inc.<br />
                  123 Tech Street<br />
                  San Francisco, CA 94105<br />
                  United States
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}