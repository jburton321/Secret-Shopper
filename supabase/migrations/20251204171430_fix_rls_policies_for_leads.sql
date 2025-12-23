/*
  # Fix RLS Policies for Secret Shopper Leads

  1. Changes
    - Drop existing policies
    - Create new policy allowing public (anonymous) users to insert leads
    - Ensure anyone can submit the form without authentication

  2. Security
    - Policy allows INSERT for public/anon users
    - No authentication required for form submission
*/

DROP POLICY IF EXISTS "Anyone can submit leads" ON secret_shopper_leads;
DROP POLICY IF EXISTS "Authenticated users can read all leads" ON secret_shopper_leads;

CREATE POLICY "Allow public inserts"
  ON secret_shopper_leads
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow authenticated reads"
  ON secret_shopper_leads
  FOR SELECT
  TO authenticated
  USING (true);
