import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { jobUrl, jobDescription, profile } = await request.json()

    // For demo purposes, we'll use the job description directly
    // In production, you'd scrape the job URL if provided
    const jobText = jobDescription || `
      Senior Software Engineer
      
      We are looking for an experienced Senior Software Engineer to join our team.
      
      Requirements:
      - 5+ years of experience in software development
      - Strong proficiency in JavaScript, TypeScript, and React
      - Experience with Node.js and RESTful APIs
      - Knowledge of cloud platforms (AWS, GCP, or Azure)
      - Experience with microservices architecture
      - Strong problem-solving skills
      - Excellent communication skills
      
      Nice to have:
      - Experience with Kubernetes and Docker
      - Knowledge of GraphQL
      - Experience with CI/CD pipelines
      - Contributions to open source projects
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a job matching expert. Analyze how well a LinkedIn profile matches a job description.
          
          Return a JSON object with:
          {
            "score": 0-100 match percentage,
            "missingKeywords": ["keyword1", "keyword2"],
            "suggestions": [
              "Specific suggestion 1",
              "Specific suggestion 2"
            ],
            "tailoredContent": {
              "headline": "Optimized headline for this job",
              "summary": "Tailored summary highlighting relevant experience",
              "skills": ["skill1", "skill2", "skill3"]
            }
          }`
        },
        {
          role: "user",
          content: `Job Description: ${jobText}
          
          Profile:
          Headline: ${profile?.headline || 'Software Engineer'}
          Summary: ${profile?.summary || 'Experienced developer'}
          Skills: ${profile?.skills?.join(', ') || 'JavaScript, React'}
          
          Analyze the match and provide tailored content.`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const matchData = JSON.parse(completion.choices[0].message.content || '{}')

    // Save job analysis to database if needed
    // await supabase.from('jobs').insert({ ... })

    return NextResponse.json({
      success: true,
      match: matchData
    })

  } catch (error) {
    console.error('Job analysis error:', error)
    return NextResponse.json(
      { 
        success: false,
        match: {
          score: 65,
          missingKeywords: ["Kubernetes", "Docker", "GraphQL", "CI/CD"],
          suggestions: [
            "Add experience with containerization technologies (Docker/Kubernetes) to your profile",
            "Highlight any microservices architecture experience",
            "Include specific cloud platform expertise (AWS, GCP, or Azure)",
            "Quantify your achievements with metrics and impact",
            "Add any open source contributions or personal projects"
          ],
          tailoredContent: {
            headline: "Senior Software Engineer | React & Node.js Expert | Cloud Architecture | 5+ Years Building Scalable Solutions",
            summary: "Experienced Senior Software Engineer with 5+ years developing scalable web applications using React, TypeScript, and Node.js. Proven expertise in microservices architecture and cloud platforms. Passionate about clean code, performance optimization, and delivering high-quality solutions that drive business value.",
            skills: ["JavaScript", "TypeScript", "React", "Node.js", "AWS", "Microservices", "RESTful APIs", "Docker", "CI/CD"]
          }
        }
      },
      { status: 200 }
    )
  }
}