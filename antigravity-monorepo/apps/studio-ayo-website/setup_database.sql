-- RUN THIS IN YOUR SUPABASE SQL EDITOR

CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  name TEXT,
  email TEXT,
  company TEXT,
  message TEXT
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (so the contact form works)
CREATE POLICY "Allow public inserts" ON leads FOR INSERT WITH CHECK (true);
