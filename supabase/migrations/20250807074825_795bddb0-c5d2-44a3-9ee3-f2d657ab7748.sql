-- Add sizes column to products table for variant support
ALTER TABLE public.products ADD COLUMN sizes jsonb DEFAULT '{"default": {"size": "Standard", "price": null}}'::jsonb;