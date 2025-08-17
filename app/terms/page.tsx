"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { FileText, Sparkles } from "lucide-react"

export default function TermsPage() {
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
              <FileText className="w-4 h-4 text-purple-400 mr-2" />
              <span className="text-sm text-purple-300">Terms of Service</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            
            <p className="text-xl text-gray-400 mb-12">
              Last updated: January 2025
            </p>

            <div className="space-y-8 text-gray-300">
              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                  By accessing and using ProfileBoost, you agree to be bound by these Terms of Service and all applicable laws and regulations. 
                  If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                <p className="leading-relaxed mb-4">
                  ProfileBoost grants you a limited, non-exclusive, non-transferable license to use our service for personal or business purposes, 
                  subject to these Terms of Service.
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                  <li>You may not modify or copy our service</li>
                  <li>You may not use the service for any illegal or unauthorized purpose</li>
                  <li>You may not transmit any worms, viruses, or destructive code</li>
                  <li>You may not violate any laws in your jurisdiction</li>
                </ul>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                <p className="leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility 
                  for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
                <p className="leading-relaxed">
                  Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. 
                  We reserve the right to change subscription fees upon 30 days notice.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
                <p className="leading-relaxed">
                  The service and its original content, features, and functionality are owned by ProfileBoost Inc. and are protected by 
                  international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  ProfileBoost shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from 
                  your use or inability to use the service. Our total liability shall not exceed the amount paid by you in the past 12 months.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
                <p className="leading-relaxed">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
                  including without limitation if you breach the Terms.
                </p>
              </section>

              <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
                <p className="leading-relaxed">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-gray-400 mt-4">
                  Email: legal@profileboost.ai<br />
                  Address: 123 Tech Street, San Francisco, CA 94105
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}