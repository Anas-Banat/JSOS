-- Create a gallery table for photo galleries
CREATE TABLE public.galleries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title TEXT,
  description_ar TEXT NOT NULL,
  description TEXT,
  author_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.galleries ENABLE ROW LEVEL SECURITY;

-- Create policies for galleries
CREATE POLICY "Everyone can view galleries" 
ON public.galleries 
FOR SELECT 
USING (true);

CREATE POLICY "Editors and admins can create galleries" 
ON public.galleries 
FOR INSERT 
WITH CHECK (has_role('editor'::user_role) OR has_role('admin'::user_role));

CREATE POLICY "Authors can update their own galleries, admins can update any" 
ON public.galleries 
FOR UPDATE 
USING ((author_id = auth.uid()) OR has_role('admin'::user_role));

CREATE POLICY "Authors can delete their own galleries, admins can delete any" 
ON public.galleries 
FOR DELETE 
USING ((author_id = auth.uid()) OR has_role('admin'::user_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_galleries_updated_at
BEFORE UPDATE ON public.galleries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create a gallery_photos table for individual photos in galleries
CREATE TABLE public.gallery_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gallery_id UUID NOT NULL REFERENCES public.galleries(id) ON DELETE CASCADE,
  title_ar TEXT,
  title TEXT,
  photo_url TEXT NOT NULL,
  photo_name TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

-- Create policies for gallery_photos
CREATE POLICY "Everyone can view gallery photos" 
ON public.gallery_photos 
FOR SELECT 
USING (true);

CREATE POLICY "Editors and admins can create gallery photos" 
ON public.gallery_photos 
FOR INSERT 
WITH CHECK (has_role('editor'::user_role) OR has_role('admin'::user_role));

CREATE POLICY "Gallery owners and admins can update gallery photos" 
ON public.gallery_photos 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.galleries 
    WHERE galleries.id = gallery_photos.gallery_id 
    AND (galleries.author_id = auth.uid() OR has_role('admin'::user_role))
  )
);

CREATE POLICY "Gallery owners and admins can delete gallery photos" 
ON public.gallery_photos 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.galleries 
    WHERE galleries.id = gallery_photos.gallery_id 
    AND (galleries.author_id = auth.uid() OR has_role('admin'::user_role))
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gallery_photos_updated_at
BEFORE UPDATE ON public.gallery_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create gallery storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-photos', 'gallery-photos', true);

-- Create policies for gallery storage
CREATE POLICY "Gallery photos are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gallery-photos');

CREATE POLICY "Authenticated users can upload gallery photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');


-----------------------------------




-- Create function to update timestamps (if it doesn't exist)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create events table with same structure as news
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title_ar TEXT NOT NULL,
  title TEXT,
  description_ar TEXT NOT NULL,
  description TEXT,
  photo_name TEXT,
  photo_url TEXT,
  author_id UUID,
  date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for events (same as news policies)
CREATE POLICY "Everyone can view events" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Editors and admins can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (has_role('editor'::user_role) OR has_role('admin'::user_role));

CREATE POLICY "Authors can update their own events, admins can update any" 
ON public.events 
FOR UPDATE 
USING ((author_id = auth.uid()) OR has_role('admin'::user_role));

CREATE POLICY "Authors can delete their own events, admins can delete any" 
ON public.events 
FOR DELETE 
USING ((author_id = auth.uid()) OR has_role('admin'::user_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_events_updated_at
BEFORE UPDATE ON public.events
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for event photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('event-photos', 'event-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for event photos
CREATE POLICY "Anyone can view event photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'event-photos');

CREATE POLICY "Authenticated users can upload event photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'event-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update event photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'event-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete event photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'event-photos' AND auth.role() = 'authenticated');




--------------------------------






-- Create news table if it doesn't exist (it already exists, so this is a safeguard)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'news') THEN
        CREATE TABLE public.news (
            id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
            author_id UUID REFERENCES auth.users(id),
            title TEXT,
            title_ar TEXT NOT NULL,
            description TEXT,
            description_ar TEXT NOT NULL,
            date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_DATE,
            photo_url TEXT,
            photo_name TEXT,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        );

        -- Enable RLS
        ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

        -- Create RLS policies
        CREATE POLICY "Everyone can view news" ON public.news
            FOR SELECT USING (true);

        CREATE POLICY "Editors and admins can create news" ON public.news
            FOR INSERT WITH CHECK (has_role('editor'::user_role) OR has_role('admin'::user_role));

        CREATE POLICY "Authors can update their own news, admins can update any" ON public.news
            FOR UPDATE USING (author_id = auth.uid() OR has_role('admin'::user_role));

        CREATE POLICY "Authors can delete their own news, admins can delete any" ON public.news
            FOR DELETE USING (author_id = auth.uid() OR has_role('admin'::user_role));

        -- Create trigger for updated_at
        CREATE TRIGGER update_news_updated_at
            BEFORE UPDATE ON public.news
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;

-- Create news-photos storage bucket if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'news-photos') THEN
        INSERT INTO storage.buckets (id, name, public) VALUES ('news-photos', 'news-photos', true);
    END IF;
END $$;

-- Create storage policies for news-photos bucket
DO $$
BEGIN
    -- Check if policies exist before creating them
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'News photos are publicly accessible'
    ) THEN
        CREATE POLICY "News photos are publicly accessible" 
        ON storage.objects FOR SELECT 
        USING (bucket_id = 'news-photos');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Editors and admins can upload news photos'
    ) THEN
        CREATE POLICY "Editors and admins can upload news photos" 
        ON storage.objects FOR INSERT 
        WITH CHECK (bucket_id = 'news-photos' AND (has_role('editor'::user_role) OR has_role('admin'::user_role)));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Editors and admins can update news photos'
    ) THEN
        CREATE POLICY "Editors and admins can update news photos" 
        ON storage.objects FOR UPDATE 
        USING (bucket_id = 'news-photos' AND (has_role('editor'::user_role) OR has_role('admin'::user_role)));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'storage' 
        AND tablename = 'objects' 
        AND policyname = 'Editors and admins can delete news photos'
    ) THEN
        CREATE POLICY "Editors and admins can delete news photos" 
        ON storage.objects FOR DELETE 
        USING (bucket_id = 'news-photos' AND (has_role('editor'::user_role) OR has_role('admin'::user_role)));
    END IF;
END $$;