import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ptdysrptolyzetansbaz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0ZHlzcnB0b2x5emV0YW5zYmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2OTI2NTAsImV4cCI6MjA1MjI2ODY1MH0.yM4M-zC4TfwBT58MuqVfKFIItzJB9y6u6vfVBycjrVE';
export const supabase = createClient(supabaseUrl, supabaseKey);