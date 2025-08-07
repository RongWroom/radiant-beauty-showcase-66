-- Fix Auth RLS Initialization Plan issues by optimizing auth.uid() calls
-- Drop existing problematic policies first

-- Appointments table policies
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can create their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can update their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Users can delete their own appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can update all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Admins can delete all appointments" ON public.appointments;

-- Orders table policies
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- Profiles table policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- User roles table policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Products table policies
DROP POLICY IF EXISTS "Anyone can view products" ON public.products;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;

-- Treatments table policies
DROP POLICY IF EXISTS "Anyone can view treatments" ON public.treatments;
DROP POLICY IF EXISTS "Admins can manage treatments" ON public.treatments;

-- Create optimized consolidated policies

-- APPOINTMENTS: Consolidated policies with optimized auth calls
CREATE POLICY "Appointments access policy" ON public.appointments
FOR SELECT 
USING (
  user_id = (SELECT auth.uid()) OR 
  public.is_admin((SELECT auth.uid()))
);

CREATE POLICY "Appointments insert policy" ON public.appointments
FOR INSERT 
WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Appointments update policy" ON public.appointments
FOR UPDATE 
USING (
  user_id = (SELECT auth.uid()) OR 
  public.is_admin((SELECT auth.uid()))
);

CREATE POLICY "Appointments delete policy" ON public.appointments
FOR DELETE 
USING (
  user_id = (SELECT auth.uid()) OR 
  public.is_admin((SELECT auth.uid()))
);

-- ORDERS: Consolidated policies with optimized auth calls
CREATE POLICY "Orders access policy" ON public.orders
FOR SELECT 
USING (
  user_id = (SELECT auth.uid()) OR 
  public.is_admin((SELECT auth.uid()))
);

CREATE POLICY "Orders insert policy" ON public.orders
FOR INSERT 
WITH CHECK (user_id = (SELECT auth.uid()));

-- PROFILES: Consolidated policies with optimized auth calls
CREATE POLICY "Profiles access policy" ON public.profiles
FOR SELECT 
USING (
  id = (SELECT auth.uid()) OR 
  public.is_admin((SELECT auth.uid()))
);

CREATE POLICY "Profiles update policy" ON public.profiles
FOR UPDATE 
USING (id = (SELECT auth.uid()));

CREATE POLICY "Profiles insert policy" ON public.profiles
FOR INSERT 
WITH CHECK (id = (SELECT auth.uid()));

-- USER_ROLES: Consolidated policy with optimized auth calls
CREATE POLICY "User roles access policy" ON public.user_roles
FOR SELECT 
USING (
  user_id = (SELECT auth.uid()) OR 
  public.is_admin((SELECT auth.uid()))
);

CREATE POLICY "User roles management policy" ON public.user_roles
FOR ALL 
USING (public.is_admin((SELECT auth.uid())));

-- PRODUCTS: Consolidated policy (public read, admin write)
CREATE POLICY "Products access policy" ON public.products
FOR SELECT 
USING (true);

CREATE POLICY "Products management policy" ON public.products
FOR ALL 
USING (public.is_admin((SELECT auth.uid())));

-- TREATMENTS: Consolidated policy (public read, admin write)
CREATE POLICY "Treatments access policy" ON public.treatments
FOR SELECT 
USING (true);

CREATE POLICY "Treatments management policy" ON public.treatments
FOR ALL 
USING (public.is_admin((SELECT auth.uid())));