import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { section, content } = await request.json()

    const prompts: Record<string, string> = {
      headline: `Optimize this LinkedIn headline for maximum impact and keyword relevance. Make it compelling and ATS-friendly:
        Current: ${content}
        
        Return only the optimized headline, no explanation.`,
      
      summary: `Optimize this LinkedIn summary to be more engaging, include relevant keywords, and highlight achievements:
        Current: ${content}
        
        Return only the optimized summary with proper formatting.`,
      
      experience: `Optimize this work experience description with action verbs, quantifiable achievements, and relevant keywords:
        Current: ${content}
        
        Return only the optimized description with bullet points.`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a LinkedIn profile optimization expert. Provide clear, concise, and impactful content."
        },
        {
          role: "user",
          content: prompts[section] || `Optimize this content: ${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    const optimized = completion.choices[0].message.content

    return NextResponse.json({
      success: true,
      optimized,
      original: content
    })

  } catch (error) {
    console.error('Optimization error:', error)
    return NextResponse.json(
      { error: 'Failed to optimize content' },
      { status: 500 }
    )
  }
}