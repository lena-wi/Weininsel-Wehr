import { createClient } from '@supabase/supabase-js';

const apiUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(apiUrl, supabaseKey);

export default supabase;
