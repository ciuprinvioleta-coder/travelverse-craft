-- Create app roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create user_roles table (security critical - separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Create articles table (multilingual)
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ro TEXT,
  title_ru TEXT,
  content_en TEXT NOT NULL,
  content_ro TEXT,
  content_ru TEXT,
  excerpt_en TEXT NOT NULL,
  excerpt_ro TEXT,
  excerpt_ru TEXT,
  cover_image TEXT,
  country TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  category TEXT,
  date_visited DATE,
  published BOOLEAN DEFAULT false,
  author_id UUID NOT NULL REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create article_images table
CREATE TABLE public.article_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption_en TEXT,
  caption_ro TEXT,
  caption_ru TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create downloads table
CREATE TABLE public.downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ro TEXT,
  title_ru TEXT,
  description_en TEXT,
  description_ro TEXT,
  description_ru TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  requires_email BOOLEAN DEFAULT false,
  download_count INT DEFAULT 0,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create trips table
CREATE TABLE public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_ro TEXT,
  title_ru TEXT,
  description_en TEXT NOT NULL,
  description_ro TEXT,
  description_ru TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  max_participants INT,
  current_participants INT DEFAULT 0,
  difficulty TEXT,
  cover_image TEXT,
  signup_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create trip_itinerary table
CREATE TABLE public.trip_itinerary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day_number INT NOT NULL,
  title_en TEXT NOT NULL,
  title_ro TEXT,
  title_ru TEXT,
  description_en TEXT,
  description_ro TEXT,
  description_ru TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create destinations table (for "This Month" section)
CREATE TABLE public.destinations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  month INT NOT NULL CHECK (month >= 1 AND month <= 12),
  temperature TEXT,
  rainfall TEXT,
  reason_en TEXT NOT NULL,
  reason_ro TEXT,
  reason_ru TEXT,
  highlight_en TEXT NOT NULL,
  highlight_ro TEXT,
  highlight_ru TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_itinerary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for user_roles (only admins can manage)
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for articles
CREATE POLICY "Anyone can view published articles"
  ON public.articles FOR SELECT
  USING (published = true OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can update articles"
  ON public.articles FOR UPDATE
  USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins can delete articles"
  ON public.articles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for article_images
CREATE POLICY "Anyone can view published article images"
  ON public.article_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.articles
    WHERE articles.id = article_images.article_id
    AND (articles.published = true OR public.is_admin_or_editor(auth.uid()))
  ));

CREATE POLICY "Admins and editors can manage article images"
  ON public.article_images FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for downloads
CREATE POLICY "Anyone can view published downloads"
  ON public.downloads FOR SELECT
  USING (published = true OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage downloads"
  ON public.downloads FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for trips
CREATE POLICY "Anyone can view published trips"
  ON public.trips FOR SELECT
  USING (published = true OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage trips"
  ON public.trips FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for trip_itinerary
CREATE POLICY "Anyone can view itinerary for published trips"
  ON public.trip_itinerary FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.trips
    WHERE trips.id = trip_itinerary.trip_id
    AND (trips.published = true OR public.is_admin_or_editor(auth.uid()))
  ));

CREATE POLICY "Admins and editors can manage itinerary"
  ON public.trip_itinerary FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for destinations
CREATE POLICY "Anyone can view published destinations"
  ON public.destinations FOR SELECT
  USING (published = true OR public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admins and editors can manage destinations"
  ON public.destinations FOR ALL
  USING (public.is_admin_or_editor(auth.uid()));

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_downloads_updated_at
  BEFORE UPDATE ON public.downloads
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trips_updated_at
  BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_destinations_updated_at
  BEFORE UPDATE ON public.destinations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();