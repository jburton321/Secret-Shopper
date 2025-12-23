/*
  # Create Secret Shopper Leads Table

  1. New Tables
    - `secret_shopper_leads`
      - `id` (uuid, primary key, auto-generated)
      - `first_name` (text, required) - Lead's first name
      - `last_name` (text, required) - Lead's last name
      - `mobile_phone` (text, required) - US mobile phone number
      - `zip_code` (text, required) - 5-digit ZIP code
      - `tcpa_consent` (boolean, required, default false) - TCPA consent checkbox
      - `vacation_with` (text, required) - Who they vacation with
      - `spouse_first_name` (text, optional) - Spouse's first name if applicable
      - `spouse_last_name` (text, optional) - Spouse's last name if applicable
      - `employment_status` (text, required) - Current employment status
      - `travel_booking_method` (text, required) - How they book travel
      - `resort_preference` (text, required) - Preferred resort type
      - `email` (text, required) - Email address
      - `consent_terms_1` (boolean, required, default false) - First consent checkbox
      - `consent_terms_2` (boolean, required, default false) - Second consent checkbox
      - `consent_terms_3` (boolean, required, default false) - Third consent checkbox
      - `created_at` (timestamptz, default now()) - When lead was submitted
      - `updated_at` (timestamptz, default now()) - When lead was last updated

  2. Security
    - Enable RLS on `secret_shopper_leads` table
    - Add policy for inserting leads (anyone can submit)
    - Add policy for service role to read all leads
*/

CREATE TABLE IF NOT EXISTS secret_shopper_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  mobile_phone text NOT NULL,
  zip_code text NOT NULL,
  tcpa_consent boolean NOT NULL DEFAULT false,
  vacation_with text NOT NULL,
  spouse_first_name text,
  spouse_last_name text,
  employment_status text NOT NULL,
  travel_booking_method text NOT NULL,
  resort_preference text NOT NULL,
  email text NOT NULL,
  consent_terms_1 boolean NOT NULL DEFAULT false,
  consent_terms_2 boolean NOT NULL DEFAULT false,
  consent_terms_3 boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE secret_shopper_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit leads"
  ON secret_shopper_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all leads"
  ON secret_shopper_leads
  FOR SELECT
  TO authenticated
  USING (true);
