"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AnimatedBackgroundSubtle } from "@/components/animated-background-subtle"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Sparkles, ArrowLeft, Calendar, Clock, User, Share2, Bookmark } from "lucide-react"
import { notFound } from "next/navigation"

// Blog articles data
const articles = {
  "linkedin-profile-mistakes": {
    title: "10 LinkedIn Profile Mistakes That Cost You Jobs",
    author: "Sarah Mitchell",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "Optimization",
    content: `
      <h2>Introduction</h2>
      <p>Your LinkedIn profile is often the first impression you make on potential employers, recruiters, and professional connections. Yet, surprisingly, most professionals make critical mistakes that significantly reduce their visibility and opportunities. Based on our analysis of over 50,000 LinkedIn profiles and conversations with hundreds of recruiters, we've identified the top 10 mistakes that could be costing you your dream job.</p>

      <h2>1. Using a Generic Headline</h2>
      <p>Your headline is prime real estate on LinkedIn, appearing in search results and whenever someone views your profile. Yet many professionals simply list their job title, missing a crucial opportunity to showcase their value proposition.</p>
      <p><strong>The Mistake:</strong> "Software Engineer at XYZ Company"</p>
      <p><strong>The Fix:</strong> "Senior Software Engineer | Building Scalable Cloud Solutions | AWS Certified | Python & React Expert"</p>
      <p>Your headline should include keywords relevant to your industry, your unique value proposition, and specific skills or certifications that set you apart.</p>

      <h2>2. Neglecting the About Section</h2>
      <p>The About section is your chance to tell your professional story in your own words, yet 40% of profiles either leave it blank or write a single, uninspiring sentence.</p>
      <p><strong>Best Practices:</strong></p>
      <ul>
        <li>Start with a compelling hook that captures attention</li>
        <li>Use the first-person narrative to create connection</li>
        <li>Include specific achievements with quantifiable results</li>
        <li>End with a clear call-to-action</li>
        <li>Use line breaks and bullet points for readability</li>
      </ul>

      <h2>3. Poor Quality or Missing Profile Photo</h2>
      <p>Profiles with professional photos receive 21x more profile views and 36x more messages. Yet many professionals use inappropriate photos or no photo at all.</p>
      <p><strong>Photo Guidelines:</strong></p>
      <ul>
        <li>Use a high-resolution, recent photo (within 2 years)</li>
        <li>Dress appropriately for your industry</li>
        <li>Ensure good lighting with a clean background</li>
        <li>Smile and make eye contact with the camera</li>
        <li>Face should take up 60% of the frame</li>
      </ul>

      <h2>4. Incomplete Experience Descriptions</h2>
      <p>Simply listing job titles and companies without context is like submitting a resume with no accomplishments. Recruiters want to understand your impact, not just your responsibilities.</p>
      <p><strong>Transform Your Experience Section:</strong></p>
      <ul>
        <li>Start each role with a brief context about the company or team</li>
        <li>Use action verbs to describe your achievements</li>
        <li>Include specific metrics and outcomes</li>
        <li>Highlight promotions or increased responsibilities</li>
        <li>Add media, links, or documents to showcase your work</li>
      </ul>

      <h2>5. Ignoring Keywords and SEO</h2>
      <p>LinkedIn's search algorithm relies heavily on keywords. Without the right keywords, you're invisible to recruiters searching for candidates with your skills.</p>
      <p><strong>Keyword Strategy:</strong></p>
      <ul>
        <li>Research job postings in your target role for common keywords</li>
        <li>Include industry-specific terminology and acronyms</li>
        <li>Repeat important keywords 2-3 times throughout your profile</li>
        <li>Use variations of keywords (e.g., "AI" and "Artificial Intelligence")</li>
        <li>Add keywords to your headline, about, and experience sections</li>
      </ul>

      <h2>6. Having Too Few Connections</h2>
      <p>LinkedIn is a network, and having fewer than 500 connections significantly limits your visibility and opportunities. Each connection expands your network exponentially through second and third-degree connections.</p>
      <p><strong>Building Your Network:</strong></p>
      <ul>
        <li>Connect with current and former colleagues</li>
        <li>Join and participate in industry groups</li>
        <li>Attend virtual events and connect with participants</li>
        <li>Send personalized connection requests</li>
        <li>Aim for quality connections in your industry</li>
      </ul>

      <h2>7. Not Showcasing Skills Properly</h2>
      <p>The Skills section affects your searchability and credibility. Having fewer than 5 skills or listing irrelevant skills can hurt your profile's effectiveness.</p>
      <p><strong>Skills Optimization:</strong></p>
      <ul>
        <li>List at least 10-15 relevant skills</li>
        <li>Prioritize skills that appear in job descriptions</li>
        <li>Get endorsements from colleagues for key skills</li>
        <li>Remove outdated or irrelevant skills</li>
        <li>Take LinkedIn skill assessments to earn badges</li>
      </ul>

      <h2>8. Lacking Social Proof</h2>
      <p>Recommendations and endorsements provide third-party validation of your expertise. Profiles without recommendations appear less credible to recruiters.</p>
      <p><strong>Building Social Proof:</strong></p>
      <ul>
        <li>Request recommendations from managers and colleagues</li>
        <li>Write recommendations for others (they often reciprocate)</li>
        <li>Showcase certifications and licenses</li>
        <li>Add publications, patents, or projects</li>
        <li>Include volunteer work and causes</li>
      </ul>

      <h2>9. Being Inactive or Inconsistent</h2>
      <p>LinkedIn rewards active users with higher visibility. Profiles that haven't been updated in months signal to recruiters that you might not be available or engaged.</p>
      <p><strong>Staying Active:</strong></p>
      <ul>
        <li>Share industry insights or articles weekly</li>
        <li>Comment thoughtfully on others' posts</li>
        <li>Update your profile with new achievements</li>
        <li>Celebrate work anniversaries and milestones</li>
        <li>Engage with your company's content</li>
      </ul>

      <h2>10. Missing Contact Information</h2>
      <p>Making it difficult for recruiters to contact you defeats the purpose of having a LinkedIn profile. Ensure multiple contact methods are available.</p>
      <p><strong>Contact Essentials:</strong></p>
      <ul>
        <li>Add your professional email address</li>
        <li>Include your location (at least city)</li>
        <li>Consider adding a phone number if comfortable</li>
        <li>Link to your portfolio or personal website</li>
        <li>Ensure your LinkedIn messaging is open</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Your LinkedIn profile is a powerful tool for career advancement, but only if optimized correctly. By avoiding these common mistakes and implementing the suggested fixes, you can dramatically increase your visibility to recruiters and unlock new opportunities. Remember, your LinkedIn profile is a living document that should evolve with your career. Regular updates and optimization ensure you're always putting your best professional foot forward.</p>

      <p><strong>Ready to transform your LinkedIn profile?</strong> Use ProfileBoost's AI-powered analysis to identify and fix these issues automatically, ensuring your profile stands out in today's competitive job market.</p>
    `
  },
  "ats-optimization-guide": {
    title: "The Power of Keywords: ATS Optimization Guide",
    author: "Michael Chen",
    date: "January 12, 2025",
    readTime: "10 min read",
    category: "SEO",
    content: `
      <h2>Understanding ATS and LinkedIn's Algorithm</h2>
      <p>In today's digital job market, your LinkedIn profile needs to work double duty: impressing human recruiters while also ranking well in both LinkedIn's search algorithm and Applicant Tracking Systems (ATS). With 87% of recruiters using LinkedIn to find candidates and 99% of Fortune 500 companies using ATS to filter applications, keyword optimization has become non-negotiable for job seekers.</p>

      <h2>How LinkedIn Search Works</h2>
      <p>LinkedIn's search algorithm considers multiple factors when ranking profiles:</p>
      <ul>
        <li><strong>Keyword Relevance:</strong> How well your profile matches search terms</li>
        <li><strong>Keyword Density:</strong> The frequency of relevant keywords (without stuffing)</li>
        <li><strong>Profile Completeness:</strong> Complete profiles rank higher</li>
        <li><strong>Activity Level:</strong> Recent activity boosts visibility</li>
        <li><strong>Connection Strength:</strong> Profiles connected to the searcher rank higher</li>
        <li><strong>Engagement Metrics:</strong> Profile views, post engagement, and messages</li>
      </ul>

      <h2>The ATS Connection</h2>
      <p>When you apply for jobs, many companies export your LinkedIn profile into their ATS. These systems scan for specific keywords to determine if you're a match for the position. Missing critical keywords means your application might never reach human eyes.</p>

      <h2>Keyword Research Strategies</h2>
      <h3>1. Job Description Analysis</h3>
      <p>Collect 10-15 job descriptions for your target role and identify recurring terms:</p>
      <ul>
        <li>Technical skills and tools</li>
        <li>Soft skills and competencies</li>
        <li>Industry-specific terminology</li>
        <li>Certifications and qualifications</li>
        <li>Years of experience requirements</li>
      </ul>

      <h3>2. LinkedIn Job Insights</h3>
      <p>Use LinkedIn's job posting insights to identify top skills employers seek. Look for the "Skills" section in job postings to see what's most in demand.</p>

      <h3>3. Competitor Analysis</h3>
      <p>Review profiles of successful professionals in your target role. Note common keywords, phrases, and how they structure their content.</p>

      <h3>4. Industry Tools and Acronyms</h3>
      <p>Include both full terms and acronyms (e.g., "Search Engine Optimization (SEO)"). Different recruiters search differently.</p>

      <h2>Strategic Keyword Placement</h2>
      <h3>Headline (Most Important)</h3>
      <p>Your headline has the highest keyword weight. Include:</p>
      <ul>
        <li>Primary job title or target role</li>
        <li>2-3 key skills or specializations</li>
        <li>Industry keywords</li>
        <li>Relevant certifications</li>
      </ul>
      <p><strong>Example:</strong> "Data Scientist | Machine Learning | Python | NLP | Stanford MS | Published Researcher"</p>

      <h3>About Section</h3>
      <p>Your summary should naturally incorporate keywords while telling your story:</p>
      <ul>
        <li>Open with your primary expertise</li>
        <li>Weave in technical skills throughout</li>
        <li>Include industry-specific achievements</li>
        <li>Mention tools and technologies</li>
        <li>Close with your specializations</li>
      </ul>

      <h3>Experience Section</h3>
      <p>Each role should include:</p>
      <ul>
        <li>Official job title (even if different internally)</li>
        <li>Technologies and tools used</li>
        <li>Methodologies and frameworks</li>
        <li>Quantifiable achievements with context</li>
        <li>Industry-specific terminology</li>
      </ul>

      <h3>Skills Section</h3>
      <p>Maximize your 50 skill slots:</p>
      <ul>
        <li>Prioritize skills from job descriptions</li>
        <li>Balance technical and soft skills</li>
        <li>Include variations (JavaScript/JS)</li>
        <li>Remove outdated skills</li>
        <li>Get endorsements for top skills</li>
      </ul>

      <h2>Advanced Optimization Techniques</h2>
      <h3>1. Semantic Keywords</h3>
      <p>Include related terms that sophisticated algorithms recognize. For "Project Manager," also include "Agile," "Scrum," "Stakeholder Management," etc.</p>

      <h3>2. Long-tail Keywords</h3>
      <p>Specific phrases like "B2B SaaS Sales Executive" or "React Native Mobile Developer" face less competition and attract more targeted opportunities.</p>

      <h3>3. Location-Based Keywords</h3>
      <p>Include your city, region, and "remote" if applicable. Many searches are location-filtered.</p>

      <h3>4. Industry Buzzwords</h3>
      <p>Stay current with industry trends. Terms like "AI," "sustainability," or "digital transformation" can increase visibility.</p>

      <h2>Avoiding Keyword Stuffing</h2>
      <p>While keywords are crucial, overuse can hurt your profile:</p>
      <ul>
        <li>Write naturally for humans first</li>
        <li>Use variations instead of repetition</li>
        <li>Focus on context and achievements</li>
        <li>Limit keyword density to 2-3%</li>
        <li>Prioritize readability over optimization</li>
      </ul>

      <h2>Measuring Success</h2>
      <p>Track your optimization efforts:</p>
      <ul>
        <li><strong>Search Appearances:</strong> Weekly appearances in search results</li>
        <li><strong>Profile Views:</strong> Increases after optimization</li>
        <li><strong>InMail Messages:</strong> Quality and quantity of recruiter outreach</li>
        <li><strong>Connection Requests:</strong> Relevant professional connections</li>
        <li><strong>Job Views:</strong> Suggested jobs matching your goals</li>
      </ul>

      <h2>Industry-Specific Keyword Lists</h2>
      <h3>Technology</h3>
      <p>Programming Languages, Frameworks, Cloud Platforms, DevOps Tools, Databases, Methodologies (Agile, Scrum), Architecture Patterns</p>

      <h3>Marketing</h3>
      <p>Digital Marketing, SEO/SEM, Content Strategy, Marketing Automation, Analytics Tools, Social Media Platforms, Campaign Management</p>

      <h3>Finance</h3>
      <p>Financial Modeling, Risk Management, Compliance, Trading Platforms, Regulatory Frameworks, Analysis Tools, Investment Strategies</p>

      <h3>Healthcare</h3>
      <p>Clinical Protocols, EMR Systems, Compliance Standards (HIPAA), Medical Terminology, Specializations, Treatment Modalities</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Lying or Exaggerating:</strong> Never include keywords for skills you don't possess</li>
        <li><strong>Ignoring Soft Skills:</strong> Leadership, communication, and collaboration matter</li>
        <li><strong>Outdated Keywords:</strong> Remove obsolete technologies or methods</li>
        <li><strong>Generic Terms:</strong> Be specific rather than using vague descriptors</li>
        <li><strong>Formatting Issues:</strong> Special characters can break ATS parsing</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Keyword optimization is both an art and a science. The key is finding the balance between searchability and authenticity. Your profile should be discoverable by algorithms while remaining genuine and engaging for human readers. Regular updates based on industry trends and job market demands ensure your profile stays relevant and visible.</p>

      <p>Remember: The goal isn't to game the system but to accurately represent your skills in a way that both machines and humans can understand and appreciate. With strategic keyword optimization, you'll increase your visibility, attract more relevant opportunities, and accelerate your career growth.</p>
    `
  },
  "ai-revolutionizing-careers": {
    title: "How AI is Revolutionizing Career Development",
    author: "Dr. Emily Rodriguez",
    date: "January 10, 2025",
    readTime: "7 min read",
    category: "Technology",
    content: `
      <h2>The AI Revolution in Professional Development</h2>
      <p>Artificial Intelligence is fundamentally transforming how professionals navigate their careers, from job searching to skill development and networking. As we enter 2025, AI tools have evolved from simple automation to sophisticated career partners that provide personalized guidance, predictive insights, and strategic recommendations. This transformation is democratizing access to career development resources previously available only to those with expensive career coaches or extensive professional networks.</p>

      <h2>AI-Powered Job Matching</h2>
      <p>Gone are the days of scrolling through hundreds of irrelevant job postings. Modern AI algorithms analyze your skills, experience, preferences, and even personality traits to match you with opportunities you're most likely to succeed in and enjoy.</p>

      <h3>How It Works:</h3>
      <ul>
        <li><strong>Deep Profile Analysis:</strong> AI examines your entire professional history, identifying patterns and strengths you might not recognize</li>
        <li><strong>Predictive Matching:</strong> Algorithms predict job satisfaction and success probability based on millions of data points</li>
        <li><strong>Hidden Opportunity Discovery:</strong> AI surfaces roles you hadn't considered but align with your skills</li>
        <li><strong>Cultural Fit Assessment:</strong> Advanced AI evaluates company culture alignment beyond just skills</li>
      </ul>

      <h2>Personalized Skill Development</h2>
      <p>AI is revolutionizing how professionals identify and develop crucial skills for career advancement.</p>

      <h3>Skill Gap Analysis</h3>
      <p>AI tools analyze job market trends and your current skillset to identify precisely what skills you need to develop for your target role. This eliminates guesswork and ensures you're investing time in the most valuable areas.</p>

      <h3>Adaptive Learning Paths</h3>
      <p>AI-powered learning platforms create personalized curricula that adapt to your learning style, pace, and goals. They can:</p>
      <ul>
        <li>Identify your optimal learning methods</li>
        <li>Adjust difficulty based on your progress</li>
        <li>Recommend resources matching your expertise level</li>
        <li>Predict time to proficiency for new skills</li>
        <li>Connect learning to real job opportunities</li>
      </ul>

      <h2>Profile Optimization and Personal Branding</h2>
      <p>AI tools are transforming how professionals present themselves online, particularly on platforms like LinkedIn.</p>

      <h3>Intelligent Content Creation</h3>
      <p>AI assists in crafting compelling professional narratives by:</p>
      <ul>
        <li>Analyzing successful profiles in your industry</li>
        <li>Suggesting powerful action verbs and keywords</li>
        <li>Optimizing content for both human readers and algorithms</li>
        <li>Ensuring consistency across all professional platforms</li>
        <li>A/B testing different profile versions for effectiveness</li>
      </ul>

      <h3>Real-time Optimization</h3>
      <p>Modern AI tools provide continuous optimization recommendations based on:</p>
      <ul>
        <li>Current job market demands</li>
        <li>Industry trend analysis</li>
        <li>Competitor benchmarking</li>
        <li>Recruiter search patterns</li>
        <li>Engagement metrics</li>
      </ul>

      <h2>Interview Preparation and Coaching</h2>
      <p>AI is democratizing access to high-quality interview preparation, previously available only through expensive coaching services.</p>

      <h3>AI Interview Simulators</h3>
      <p>Advanced AI platforms now offer:</p>
      <ul>
        <li>Realistic interview simulations with AI interviewers</li>
        <li>Analysis of speech patterns, tone, and pace</li>
        <li>Body language and facial expression feedback</li>
        <li>Content analysis for answer quality</li>
        <li>Industry and role-specific question banks</li>
      </ul>

      <h3>Personalized Feedback</h3>
      <p>AI provides detailed feedback on:</p>
      <ul>
        <li>Answer structure and clarity</li>
        <li>Use of STAR methodology</li>
        <li>Confidence and enthusiasm levels</li>
        <li>Areas for improvement with specific exercises</li>
        <li>Comparison to successful candidate patterns</li>
      </ul>

      <h2>Networking and Relationship Building</h2>
      <p>AI is making professional networking more strategic and effective than ever before.</p>

      <h3>Strategic Connection Recommendations</h3>
      <p>AI algorithms identify valuable connections based on:</p>
      <ul>
        <li>Career trajectory analysis</li>
        <li>Mutual interests and goals</li>
        <li>Potential for mutual benefit</li>
        <li>Industry influence and reach</li>
        <li>Likelihood of meaningful engagement</li>
      </ul>

      <h3>Engagement Optimization</h3>
      <p>AI helps maintain and strengthen professional relationships through:</p>
      <ul>
        <li>Optimal timing for outreach</li>
        <li>Personalized message suggestions</li>
        <li>Content sharing recommendations</li>
        <li>Relationship strength tracking</li>
        <li>Follow-up reminders and suggestions</li>
      </ul>

      <h2>Career Path Prediction and Planning</h2>
      <p>One of AI's most powerful applications is in long-term career planning and trajectory prediction.</p>

      <h3>Predictive Career Modeling</h3>
      <p>AI can now:</p>
      <ul>
        <li>Map potential career paths based on your profile</li>
        <li>Predict salary trajectories for different paths</li>
        <li>Identify pivot opportunities and timing</li>
        <li>Forecast industry changes affecting your role</li>
        <li>Recommend preemptive skill development</li>
      </ul>

      <h3>Market Intelligence</h3>
      <p>AI provides real-time insights on:</p>
      <ul>
        <li>Emerging roles and industries</li>
        <li>Skill demand fluctuations</li>
        <li>Salary trends and negotiations benchmarks</li>
        <li>Geographic opportunity analysis</li>
        <li>Remote work availability trends</li>
      </ul>

      <h2>Challenges and Considerations</h2>
      <p>While AI offers tremendous benefits, professionals should be aware of important considerations:</p>

      <h3>Maintaining Authenticity</h3>
      <p>The key is using AI as an enhancement tool rather than replacement for genuine professional identity. Your unique voice and experiences should shine through AI-optimized content.</p>

      <h3>Data Privacy</h3>
      <p>Understanding how AI platforms use your data is crucial. Choose platforms with transparent privacy policies and strong data protection measures.</p>

      <h3>Over-reliance Risks</h3>
      <p>While AI provides valuable insights, maintaining human judgment and intuition in career decisions remains essential. AI should inform, not dictate, your career choices.</p>

      <h2>The Future of AI in Career Development</h2>
      <p>Looking ahead, we can expect:</p>
      <ul>
        <li><strong>Hyper-Personalization:</strong> AI will provide increasingly individualized career guidance</li>
        <li><strong>Predictive Job Creation:</strong> AI will identify and help create roles that don't yet exist</li>
        <li><strong>Real-time Market Adaptation:</strong> Instant career pivoting recommendations based on market changes</li>
        <li><strong>Holistic Life Integration:</strong> AI considering work-life balance, values, and personal goals</li>
        <li><strong>Collaborative AI Coaches:</strong> AI working alongside human coaches for optimal results</li>
      </ul>

      <h2>Conclusion</h2>
      <p>AI is not replacing human career development but augmenting it in powerful ways. By leveraging AI tools strategically, professionals can make more informed decisions, develop relevant skills faster, and navigate career transitions more successfully. The key is embracing these tools while maintaining authenticity and human connection.</p>

      <p>As AI continues to evolve, those who learn to work effectively with these tools will have a significant advantage in the job market. The future belongs to professionals who can combine their uniquely human qualities with AI's analytical power to create compelling career narratives and achieve their professional goals.</p>
    `
  }
}

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const article = articles[slug as keyof typeof articles]
  
  if (!article) {
    notFound()
  }

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
                <Link href="/blog">
                  <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
                    Back to Blog
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

      {/* Article Content */}
      <article className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back to Blog */}
            <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to all articles
            </Link>

            {/* Article Header */}
            <div className="mb-12">
              <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full mb-4">
                {article.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {article.title}
              </h1>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {article.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  {article.readTime}
                </div>
              </div>
            </div>

            {/* Article Actions */}
            <div className="flex items-center space-x-4 mb-12">
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
                <Bookmark className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-gray-300 prose-ul:my-6
                prose-li:my-2
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* CTA Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Ready to Optimize Your Profile?</h3>
              <p className="text-gray-300 mb-6">
                Use ProfileBoost&apos;s AI-powered tools to implement these strategies and transform your LinkedIn presence.
              </p>
              <Link href="/auth/signup">
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  )
}