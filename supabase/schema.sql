-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  linkedin_id TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'team', 'enterprise')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  linkedin_data JSONB,
  enhanced_data JSONB,
  headline TEXT,
  summary TEXT,
  location TEXT,
  industry TEXT,
  current_position TEXT,
  experience JSONB DEFAULT '[]',
  education JSONB DEFAULT '[]',
  skills TEXT[] DEFAULT '{}',
  certifications JSONB DEFAULT '[]',
  projects JSONB DEFAULT '[]',
  languages JSONB DEFAULT '[]',
  profile_url TEXT,
  connections INTEGER,
  profile_views INTEGER,
  search_appearances INTEGER,
  post_impressions INTEGER,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  job_url TEXT NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  description TEXT,
  requirements TEXT[],
  preferred_qualifications TEXT[],
  extracted_keywords TEXT[],
  job_data JSONB,
  tailored_profile JSONB,
  match_score FLOAT CHECK (match_score >= 0 AND match_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  profile_views INTEGER DEFAULT 0,
  search_appearances INTEGER DEFAULT 0,
  connection_requests INTEGER DEFAULT 0,
  messages_received INTEGER DEFAULT 0,
  post_views INTEGER DEFAULT 0,
  engagement_rate FLOAT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Profile analyses table
CREATE TABLE profile_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  overall_score FLOAT CHECK (overall_score >= 0 AND overall_score <= 100),
  section_scores JSONB,
  suggestions JSONB,
  keywords JSONB,
  competitor_comparison JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profile versions table (for history)
CREATE TABLE profile_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  data JSONB NOT NULL,
  changes JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  UNIQUE(profile_id, version_number)
);

-- Competitors table (for benchmarking)
CREATE TABLE competitors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  industry TEXT NOT NULL,
  role TEXT NOT NULL,
  profile_data JSONB NOT NULL,
  keywords TEXT[],
  skills TEXT[],
  experience_years INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_analytics_user_id_date ON analytics(user_id, date);
CREATE INDEX idx_profile_analyses_profile_id ON profile_analyses(profile_id);
CREATE INDEX idx_profile_versions_profile_id ON profile_versions(profile_id);
CREATE INDEX idx_competitors_industry_role ON competitors(industry, role);

-- Create vector embedding column for semantic search
ALTER TABLE profiles ADD COLUMN embedding vector(1536);
ALTER TABLE jobs ADD COLUMN embedding vector(1536);

-- Create indexes for vector similarity search
CREATE INDEX ON profiles USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX ON jobs USING ivfflat (embedding vector_cosine_ops);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_versions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own user data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own user data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own profiles" ON profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own profiles" ON profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profiles" ON profiles
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own profiles" ON profiles
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Users can view own jobs" ON jobs
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert own jobs" ON jobs
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own jobs" ON jobs
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own jobs" ON jobs
  FOR DELETE USING (user_id = auth.uid());

CREATE POLICY "Users can view own analytics" ON analytics
  FOR SELECT USING (user_id = auth.uid());

-- Functions for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();