/*
  # Lead Capture and Contact Forms

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, required)
      - `company` (text, optional)
      - `message` (text, optional)
      - `form_type` (text, demo or contact)
      - `created_at` (timestamptz)
    
    - `trial_signups`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `name` (text, optional)
      - `company` (text, optional)
      - `source` (text, tracks which CTA converted)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS on both tables
    - Allow public INSERT for lead capture
    - Restrict SELECT to authenticated users only
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  message text,
  form_type text DEFAULT 'contact',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS trial_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  company text,
  source text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can signup for trial"
  ON trial_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view trial signups"
  ON trial_signups
  FOR SELECT
  TO authenticated
  USING (true);