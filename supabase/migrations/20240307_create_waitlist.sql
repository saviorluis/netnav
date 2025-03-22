-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON public.waitlist (email);

-- Add row level security (RLS) policies
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Policy to allow only inserts from authenticated users or with valid anon key
CREATE POLICY "Allow public inserts to waitlist" ON public.waitlist
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Policy to prevent public reads/updates/deletes
CREATE POLICY "No public access except insert" ON public.waitlist
    FOR ALL
    TO public
    USING (false);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_waitlist_updated_at
    BEFORE UPDATE ON public.waitlist
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 