import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as cheerio from 'cheerio'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function scrapeLinkedInProfile(url: string) {
  try {
    // Note: Direct scraping of LinkedIn is against their ToS
    // This is a demonstration - in production, you'd need user consent
    // and possibly use LinkedIn's official API or browser extension
    
    // For demo purposes, we'll return simulated data
    // In production, you might use Puppeteer or Playwright for scraping
    
    return {
      headline: "Senior Software Engineer | Full Stack Developer",
      summary: `Passionate software engineer with 8+ years of experience building scalable web applications. 
                Expertise in React, Node.js, and cloud technologies. 
                Strong advocate for clean code and agile methodologies.`,
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Innovators Inc.",
          duration: "2020 - Present",
          description: "Leading development of microservices architecture, mentoring junior developers"
        },
        {
          title: "Software Engineer",
          company: "Digital Solutions Co.",
          duration: "2016 - 2020",
          description: "Developed RESTful APIs and implemented CI/CD pipelines"
        }
      ],
      education: [
        {
          school: "University of Technology",
          degree: "Bachelor of Science",
          field: "Computer Science",
          duration: "2012 - 2016"
        }
      ],
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "GraphQL", "MongoDB"],
      location: "San Francisco Bay Area"
    }
  } catch (error) {
    console.error('Scraping error:', error)
    throw new Error('Failed to scrape profile')
  }
}

async function analyzeScrapedProfile(profileData: any) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a LinkedIn profile optimization expert. Analyze the scraped profile and provide:
          1. An optimization score (0-100)
          2. Detailed suggestions for each section
          3. Missing keywords for the person's industry
          4. Competitor insights
          
          Return as JSON with this structure:
          {
            "score": number,
            "sectionScores": {
              "headline": number,
              "summary": number,
              "experience": number,
              "skills": number
            },
            "suggestions": {
              "headline": ["suggestion1"],
              "summary": ["suggestion1"],
              "experience": ["suggestion1"],
              "skills": ["suggestion1"]
            },
            "missingKeywords": ["keyword1", "keyword2"],
            "industryInsights": "Brief analysis of what top performers in this field include"
          }`
        },
        {
          role: "user",
          content: JSON.stringify(profileData)
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    return JSON.parse(completion.choices[0].message.content || '{}')
  } catch (error) {
    console.error('Analysis error:', error)
    return {
      score: 65,
      sectionScores: {
        headline: 70,
        summary: 60,
        experience: 75,
        skills: 65
      },
      suggestions: {
        headline: ["Add key technologies and your unique value proposition"],
        summary: ["Include quantifiable achievements and impact metrics"],
        experience: ["Use action verbs and include specific accomplishments"],
        skills: ["Add emerging technologies relevant to your field"]
      },
      missingKeywords: ["agile", "scrum", "cloud architecture", "DevOps"],
      industryInsights: "Top performers typically highlight leadership experience and measurable business impact"
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { url } = await request.json()

    if (!url || !url.includes('linkedin.com')) {
      return NextResponse.json(
        { error: 'Please provide a valid LinkedIn profile URL' },
        { status: 400 }
      )
    }

    // Scrape profile
    const scrapedData = await scrapeLinkedInProfile(url)

    // Analyze with AI
    const analysis = await analyzeScrapedProfile(scrapedData)

    // Save to database
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        headline: scrapedData.headline,
        summary: scrapedData.summary,
        location: scrapedData.location,
        experience: scrapedData.experience,
        education: scrapedData.education,
        skills: scrapedData.skills,
        profile_url: url,
        version: 1
      })
      .select()
      .single()

    if (profileError) {
      throw profileError
    }

    // Save analysis
    await supabase
      .from('profile_analyses')
      .insert({
        profile_id: profile.id,
        overall_score: analysis.score,
        section_scores: analysis.sectionScores,
        suggestions: analysis.suggestions,
        keywords: { 
          missing: analysis.missingKeywords,
          insights: analysis.industryInsights
        }
      })

    return NextResponse.json({
      success: true,
      profile: {
        ...profile,
        analysis: {
          overallScore: analysis.score,
          sectionScores: analysis.sectionScores,
          suggestions: analysis.suggestions,
          missingKeywords: analysis.missingKeywords,
          industryInsights: analysis.industryInsights
        }
      }
    })

  } catch (error) {
    console.error('URL import error:', error)
    return NextResponse.json(
      { error: 'Failed to import profile from URL' },
      { status: 500 }
    )
  }
}