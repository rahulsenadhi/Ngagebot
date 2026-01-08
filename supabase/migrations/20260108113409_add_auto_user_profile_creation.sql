/*
  # Auto-create user profile on signup

  1. Changes
    - Creates a database function that automatically creates a user_profile when a new user signs up
    - Adds a trigger on auth.users table to call this function
  
  2. Security
    - Function runs with security definer to bypass RLS
    - Only creates profile for new users
  
  3. Important Notes
    - This ensures every new user automatically gets a profile with trial settings
    - Profile is created immediately after auth.users record is created
*/

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, trial_start_date, trial_end_date, plan_type, onboarding_completed)
  VALUES (
    NEW.id,
    now(),
    now() + interval '14 days',
    'trial',
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();