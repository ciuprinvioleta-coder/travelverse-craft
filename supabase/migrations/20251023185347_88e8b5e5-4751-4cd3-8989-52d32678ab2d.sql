-- Phase 1: Drop all unused backend infrastructure
-- This removes all database tables, functions, triggers, and types that are not being used

-- Drop trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop tables (CASCADE handles foreign keys and dependencies)
DROP TABLE IF EXISTS public.article_images CASCADE;
DROP TABLE IF EXISTS public.trip_itinerary CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.destinations CASCADE;
DROP TABLE IF EXISTS public.downloads CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role) CASCADE;
DROP FUNCTION IF EXISTS public.is_admin_or_editor(uuid) CASCADE;
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

-- Drop custom enum type
DROP TYPE IF EXISTS public.app_role CASCADE;

-- Database is now completely clean - ready for future re-implementation if needed