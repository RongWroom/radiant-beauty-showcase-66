
import React from 'react';
import { Shield, Lock, Eye, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUserRole } from '@/hooks/useUserRole';

export const SecurityBanner = () => {
  const { isAdmin, loading } = useUserRole();

  if (loading) {
    return null;
  }

  if (isAdmin) {
    return (
      <Alert className="mb-4 border-yellow-200 bg-yellow-50 text-yellow-800">
        <Shield className="h-4 w-4" />
        <AlertDescription className="flex items-center gap-2">
          <Lock className="h-3 w-3" />
          <span className="text-sm">
            Administrator account - All actions are logged and monitored
          </span>
          <Eye className="h-3 w-3" />
          <span className="text-sm">
            Enhanced security protocols active
          </span>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
      <Info className="h-4 w-4" />
      <AlertDescription>
        <span className="text-sm">
          Your account is secured
        </span>
      </AlertDescription>
    </Alert>
  );
};
