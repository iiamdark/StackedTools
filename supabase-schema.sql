-- ==========================================================================
-- StackedTools.online — Supabase Database Schema
-- Execute this SQL script in the Supabase SQL Editor to create your database
-- ==========================================================================

-- 1. Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    content TEXT NOT NULL, -- Markdown or HTML content
    category_slug TEXT NOT NULL REFERENCES public.categories(slug) ON DELETE CASCADE,
    author TEXT DEFAULT 'StackedTools Team'::text NOT NULL,
    hero_image TEXT,
    published BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Insert default categories
INSERT INTO public.categories (name, slug, description)
VALUES 
    ('AI Tools', 'ai-tools', 'Reviews and comparisons of artificial intelligence software'),
    ('Productivity', 'productivity', 'Task management and workflow efficiency tools'),
    ('Comparisons', 'comparisons', 'Head-to-head software feature and pricing breakdowns'),
    ('Automation', 'automation', 'No-code workflow automation tools and integrations'),
    ('Business Software', 'business-software', 'Enterprise CRMs, marketing, and analytics platforms'),
    ('Guides', 'guides', 'Actionable tutorials and step-by-step digital tool walkthroughs')
ON CONFLICT (slug) DO NOTHING;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies
-- Allow public read access to published posts
CREATE POLICY "Public users can view published posts" 
ON public.posts FOR SELECT 
USING (published = true);

-- Allow public read access to categories
CREATE POLICY "Public users can view categories" 
ON public.categories FOR SELECT 
USING (true);

-- Allow service role / authenticated admins full access
CREATE POLICY "Admins have full access to posts" 
ON public.posts FOR ALL 
USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
