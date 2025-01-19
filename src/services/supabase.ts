import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://umwjevpyasylkyfwtmkh.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtd2pldnB5YXN5bGt5Znd0bWtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyNDA2NDQsImV4cCI6MjA1MjgxNjY0NH0.j8WVJ4kBhHEUEsJvtApLFds6YnWHj0W8_Gus4GANW8c
