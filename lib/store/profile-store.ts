import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { LinkedInProfile, Job, ProfileAnalysis } from '@/lib/types'

interface ProfileState {
  currentProfile: LinkedInProfile | null
  analysis: ProfileAnalysis | null
  jobs: Job[]
  selectedJob: Job | null
  isLoading: boolean
  error: string | null
  
  setProfile: (profile: LinkedInProfile) => void
  setAnalysis: (analysis: ProfileAnalysis) => void
  addJob: (job: Job) => void
  selectJob: (job: Job) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
  reset: () => void
}

export const useProfileStore = create<ProfileState>()(
  devtools(
    persist(
      (set) => ({
        currentProfile: null,
        analysis: null,
        jobs: [],
        selectedJob: null,
        isLoading: false,
        error: null,
        
        setProfile: (profile) => set({ currentProfile: profile }),
        setAnalysis: (analysis) => set({ analysis }),
        addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),
        selectJob: (job) => set({ selectedJob: job }),
        setLoading: (isLoading) => set({ isLoading }),
        setError: (error) => set({ error }),
        reset: () => set({
          currentProfile: null,
          analysis: null,
          jobs: [],
          selectedJob: null,
          isLoading: false,
          error: null,
        }),
      }),
      {
        name: 'profile-storage',
      }
    )
  )
)