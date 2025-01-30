-- init.sql
CREATE TABLE IF NOT EXISTS urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  short_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_accessed TIMESTAMP WITH TIME ZONE,
  access_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_short_code ON urls(short_code);

-- Add some test data
INSERT INTO urls (original_url, short_code) 
VALUES 
  ('https://www.google.com', 'google123'),
  ('https://www.github.com', 'github456')
ON CONFLICT DO NOTHING;