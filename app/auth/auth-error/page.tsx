"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  const getErrorMessage = () => {
    // Check for specific error descriptions first
    if (error_description) {
      if (error_description.includes('missing OAuth secret')) {
        return 'Google Sign-In is not properly configured. The OAuth Client Secret is missing in the authentication settings. Please contact the administrator to complete the Google OAuth setup.'
      }
      if (error_description.includes('provider is not enabled')) {
        return 'Google Sign-In is not enabled. Please contact the administrator to enable Google authentication.'
      }
      return error_description
    }
    
    switch (error) {
      case 'access_denied':
        return 'You denied access to your account. Please try again if this was a mistake.'
      case 'unauthorized_client':
        return 'There was an issue with authentication configuration. Please contact support.'
      case 'invalid_request':
        return 'The authentication request was invalid. Please try signing in again.'
      case 'unsupported_response_type':
        return 'Authentication configuration error. Please contact support.'
      case 'server_error':
        return 'The authentication server encountered an error. Please try again later.'
      case 'temporarily_unavailable':
        return 'Authentication service is temporarily unavailable. Please try again in a few minutes.'
      default:
        return 'An unexpected error occurred during authentication. Please try again.'
    }
  }

  const getErrorTitle = () => {
    switch (error) {
      case 'access_denied':
        return 'Access Denied'
      case 'server_error':
        return 'Server Error'
      case 'temporarily_unavailable':
        return 'Service Unavailable'
      default:
        return 'Authentication Error'
    }
  }

  const getSuggestions = () => {
    const suggestions = [
      'Make sure you have a stable internet connection',
      'Clear your browser cookies and cache',
      'Try using a different browser or incognito mode',
      'Ensure pop-ups are not blocked for this site'
    ]

    if (error === 'access_denied') {
      suggestions.unshift('Click "Allow" or "Authorize" when prompted by Google')
    }

    return suggestions
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl relative z-10"
    >
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2 text-red-400">
                {getErrorTitle()}
              </h1>
              <p className="text-gray-300">
                {getErrorMessage()}
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-gray-500 font-mono">
                Error Code: {error}
              </p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-purple-400" />
              Troubleshooting Suggestions
            </h2>
            <ul className="space-y-2">
              {getSuggestions().map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-400 mr-2">•</span>
                  <span className="text-sm text-gray-300">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/login" className="flex-1">
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button 
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
              >
                Go to Homepage
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <p className="text-sm text-yellow-300">
              <strong>Note:</strong> If you continue to experience issues, please ensure that Google OAuth is properly configured. The provider may not be enabled in the authentication settings.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Need help? Contact support at{' '}
              <a href="mailto:support@profileboost.ai" className="text-purple-400 hover:text-purple-300 transition-colors">
                support@profileboost.ai
              </a>
            </p>
          </div>
        </div>
      </motion.div>
  )
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <AnimatedBackgroundSubtle />
      <Suspense fallback={
        <div className="w-full max-w-2xl relative z-10">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading...</p>
            </div>
          </div>
        </div>
      }>
        <AuthErrorContent />
      </Suspense>
    </div>
  )
}