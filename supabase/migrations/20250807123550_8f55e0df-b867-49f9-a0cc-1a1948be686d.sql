-- Fix remaining multiple permissive policies by separating SELECT from management operations

-- Products table: Fix overlapping SELECT policies
DROP POLICY IF EXISTS "Products management policy" ON public.products;

-- Create separate policies for different operations (not using ALL)
CREATE POLICY "Products insert policy" ON public.products
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Products update policy" ON public.products
FOR UPDATE 
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Products delete policy" ON public.products
FOR DELETE 
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

-- Treatments table: Fix overlapping SELECT policies  
DROP POLICY IF EXISTS "Treatments management policy" ON public.treatments;

-- Create separate policies for different operations (not using ALL)
CREATE POLICY "Treatments insert policy" ON public.treatments
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Treatments update policy" ON public.treatments
FOR UPDATE 
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Treatments delete policy" ON public.treatments
FOR DELETE 
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

-- User roles table: Fix overlapping SELECT policies
DROP POLICY IF EXISTS "User roles management policy" ON public.user_roles;

-- Create separate policies for different operations (not using ALL)
CREATE POLICY "User roles insert policy" ON public.user_roles
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin((SELECT auth.uid())));

CREATE POLICY "User roles update policy" ON public.user_roles
FOR UPDATE 
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

CREATE POLICY "User roles delete policy" ON public.user_roles
FOR DELETE 
TO authenticated
USING (public.is_admin((SELECT auth.uid())));