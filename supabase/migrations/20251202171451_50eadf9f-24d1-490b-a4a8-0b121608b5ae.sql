-- Create storage bucket for portfolio assets
INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio', 'portfolio', true);

-- Allow public read access to portfolio files
CREATE POLICY "Public can view portfolio files" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload portfolio files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update portfolio files" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete portfolio files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');

-- Add video_url column to projects table
ALTER TABLE public.projects ADD COLUMN video_url TEXT;