CREATE TABLE public.site_errors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  kind TEXT NOT NULL DEFAULT 'runtime',
  message TEXT NOT NULL,
  stack TEXT,
  url TEXT,
  route TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT INSERT ON public.site_errors TO anon;
GRANT SELECT, DELETE ON public.site_errors TO authenticated;
GRANT ALL ON public.site_errors TO service_role;
ALTER TABLE public.site_errors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can report errors" ON public.site_errors FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view errors" ON public.site_errors FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete errors" ON public.site_errors FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));