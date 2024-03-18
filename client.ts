import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://utmsneydiqzdzjagtyxu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0bXNuZXlkaXF6ZHpqYWd0eXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3NDYxMDIsImV4cCI6MjAyNjMyMjEwMn0.OdcQqL-QMS5WTHGahgXoHz0XK7WvF1L8_F4JSI_AA64"
);
