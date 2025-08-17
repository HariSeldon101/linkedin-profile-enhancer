import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profileData = await request.json()

    // Update profile in database
    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        headline: profileData.headline,
        summary: profileData.summary,
        experience: profileData.experience,
        education: profileData.education,
        skills: profileData.skills,
        certifications: profileData.certifications,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      profile
    })

  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json(
      { error: 'Failed to save profile' },
      { status: 500 }
    )
  }
}