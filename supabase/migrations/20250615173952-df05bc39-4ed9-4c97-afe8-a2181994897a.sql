
-- 1. Create the entries table for storing user transactions
CREATE TABLE public.entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  type TEXT CHECK (type IN ('income', 'expense')) NOT NULL,
  category TEXT NOT NULL,
  note TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. (Optional but recommended) Add foreign key linking user_id to auth.users
ALTER TABLE public.entries
  ADD CONSTRAINT fk_entries_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Enable Row Level Security
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

-- 4. Allow users to SELECT their own entries
CREATE POLICY "Users can view their own entries"
  ON public.entries FOR SELECT
  USING (auth.uid() = user_id);

-- 5. Allow users to INSERT their own entries
CREATE POLICY "Users can insert their own entries"
  ON public.entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 6. Allow users to UPDATE their own entries
CREATE POLICY "Users can update their own entries"
  ON public.entries FOR UPDATE
  USING (auth.uid() = user_id);

-- 7. Allow users to DELETE their own entries
CREATE POLICY "Users can delete their own entries"
  ON public.entries FOR DELETE
  USING (auth.uid() = user_id);
