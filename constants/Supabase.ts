import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://dtkbklkdtqzbfizhmheu.supabase.co";
const PUBLIC_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0a2JrbGtkdHF6YmZpemhtaGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk1ODA2OTYsImV4cCI6MjAzNTE1NjY5Nn0.v46odOTSVEkW6GOY1byH1tTig7tsTUhTpg6xCo1iE6A"
 
export const supabase = createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

export interface Stretch {
    id: number;
    name: string;
  }