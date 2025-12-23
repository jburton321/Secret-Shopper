import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LeadData {
  first_name: string;
  last_name: string;
  mobile_phone: string;
  zip_code: string;
  tcpa_consent: boolean;
  vacation_with: string;
  spouse_first_name?: string;
  spouse_last_name?: string;
  employment_status: string;
  travel_booking_method: string;
  resort_preference: string;
  email: string;
  consent_terms_1: boolean;
  consent_terms_2: boolean;
  consent_terms_3: boolean;
}

export async function submitLead(data: LeadData) {
  const { data: result, error } = await supabase
    .from('secret_shopper_leads')
    .insert([data])
    .select();

  if (error) {
    throw error;
  }

  return result;
}
