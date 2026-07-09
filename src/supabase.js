import { createClient } from "@supabase/supabase-js";

// Hier holen wir uns die Daten aus der .env-Datei
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Hier erstellen wir Client und exportieren ihn für unsere App
export const supabase = createClient(supabaseUrl, supabaseAnonKey)