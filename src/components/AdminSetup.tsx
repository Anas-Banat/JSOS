import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { createAdminUser, createProfileForExistingUser } from '@/utils/createAdmin';
import { useAuth } from '@/contexts/AuthContext';

export const AdminSetup = () => {
  const [email, setEmail] = useState('info@jma.org.jo');
  const [password, setPassword] = useState('anas@123');
  const [fullName, setFullName] = useState('Anas');
  const [isCreating, setIsCreating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useAuth();

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !fullName) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }
    
    if (password.length < 6) {
      toast({
        title: 'Error',
        description: 'Password must be at least 6 characters long',
        variant: 'destructive',
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      console.log('Starting admin creation process...');
      console.log('Email:', email);
      console.log('Full Name:', fullName);
      
      const result = await createAdminUser(email, password, fullName);
      
      if (result.success) {
        console.log('Admin user created successfully!');
        toast({
          description: 'Admin user created successfully! You can now log in.',
        });
        setIsComplete(true);
      } else {
        console.error('Failed to create admin user:', result.error);
        toast({
          title: 'Error',
          description: result.message || 'Failed to create admin user',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error in handleCreateAdmin:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleCreateProfileForCurrentUser = async () => {
    if (!user) {
      toast({
        title: 'Error',
        description: 'No user logged in',
        variant: 'destructive',
      });
      return;
    }
    
    setIsCreating(true);
    
    try {
      console.log('Creating profile for current user:', user.id);
      
      const result = await createProfileForExistingUser(
        user.id,
        user.email || 'unknown@email.com',
        fullName,
        'admin'
      );
      
      if (result.success) {
        console.log('Profile created successfully!');
        toast({
          description: 'Profile created successfully! Please refresh the page.',
        });
        // Refresh the page to reload the auth context
        window.location.reload();
      } else {
        console.error('Failed to create profile:', result.error);
        toast({
          title: 'Error',
          description: result.message || 'Failed to create profile',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Error creating profile:', error);
      toast({
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-green-600">Admin Setup Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="mb-4">Your admin user has been created successfully.</p>
          <div className="bg-gray-50 p-4 rounded-lg text-sm text-left">
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Name:</strong> {fullName}</p>
            <p><strong>Role:</strong> Admin</p>
          </div>
          <p className="text-sm text-gray-600">
            You can now go to the login page and sign in with your admin credentials.
            After logging in, you'll be able to access the admin panel to create additional users.
          </p>
          <Button 
            onClick={() => window.location.href = '/emp_portal'} 
            className="w-full"
          >
            Go to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Create Admin User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Enter password (min 6 characters)"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isCreating}>
            {isCreating ? 'Creating Admin...' : 'Create Admin User'}
          </Button>
          
          {user && (
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              disabled={isCreating}
              onClick={handleCreateProfileForCurrentUser}
            >
              {isCreating ? 'Creating Profile...' : 'Create Profile for Current User'}
            </Button>
          )}
          
          <div className="text-xs text-gray-500 text-center">
            <p>Pre-filled with test data:</p>
            <p>Name: Anas | Email: info@jma.org.jo | Password: anas@123</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
