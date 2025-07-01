
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldX } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  fallback 
}) => {
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!isAdmin) {
    return fallback || (
      <Alert className="border-red-200 bg-red-50 text-red-800">
        <ShieldX className="h-4 w-4" />
        <AlertDescription>
          Access denied. Administrator privileges required.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
