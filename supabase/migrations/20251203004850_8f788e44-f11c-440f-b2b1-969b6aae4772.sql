-- Create gameplay_videos table for esports content
CREATE TABLE public.gameplay_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  game TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gameplay_videos ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can read gameplay videos" ON public.gameplay_videos FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert gameplay videos" ON public.gameplay_videos FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update gameplay videos" ON public.gameplay_videos FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete gameplay videos" ON public.gameplay_videos FOR DELETE USING (true);

-- Create photography table
CREATE TABLE public.photography (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.photography ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Anyone can read photography" ON public.photography FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert photography" ON public.photography FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can update photography" ON public.photography FOR UPDATE USING (true);
CREATE POLICY "Authenticated users can delete photography" ON public.photography FOR DELETE USING (true);