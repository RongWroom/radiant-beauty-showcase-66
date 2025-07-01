
import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const SecurityBanner = () => {
  return (
    <Alert className="mb-4 border-green-200 bg-green-50 text-green-800">
      <Shield className="h-4 w-4" />
      <AlertDescription className="flex items-center gap-2">
        <Lock className="h-3 w-3" />
        <span className="text-sm">
          Your data is protected with enterprise-grade security
        </span>
        <Eye className="h-3 w-3" />
        <span className="text-sm">
          All actions are logged and monitored
        </span>
      </AlertDescription>
    </Alert>
  );
};
