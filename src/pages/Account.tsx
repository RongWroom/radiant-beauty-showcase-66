
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import { SecurityBanner } from '@/components/security/SecurityBanner';
import { AdminGuard } from '@/components/security/AdminGuard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Shield, Settings, LogOut, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Account = () => {
  const { user, signOut } = useAuth();
  const { role, isAdmin, loading } = useUserRole();

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to access your account</h1>
            <Button onClick={() => window.location.href = '/auth'}>
              Go to Login
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <SecurityBanner />
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Account Dashboard</h1>
            {isAdmin && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                ADMIN
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">User ID</label>
                  <p className="font-mono text-sm text-gray-500">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Account Role</label>
                  <p className="font-medium capitalize">{loading ? 'Loading...' : role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Member Since</label>
                  <p className="font-medium">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link to="/my-appointments">
                    <Calendar className="h-4 w-4 mr-2" />
                    My Appointments
                  </Link>
                </Button>
                
                <AdminGuard>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => alert('Admin panel coming soon!')}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </AdminGuard>

                <Button 
                  variant="destructive" 
                  className="w-full justify-start"
                  onClick={signOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>

          <AdminGuard fallback={null}>
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Administrator Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-yellow-700 mb-4">
                  You have administrator privileges. All administrative actions are logged and monitored for security purposes.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                    View Audit Logs
                  </Button>
                  <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                    Manage Users
                  </Button>
                  <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                    System Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AdminGuard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
