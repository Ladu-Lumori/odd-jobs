import { createClient } from "@supabase/supabase-js";
import { REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY } from "../config";

export const supabase = createClient(
    "https://vcfadhhkkbitkktzbksx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjZmFkaGhra2JpdGtrdHpia3N4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQwMTY1MjIsImV4cCI6MTk3OTU5MjUyMn0.TUYnRPxfKZB1T4pFF7nY7RZQsRFVd1Z_4OoXmXbSGMA"
);