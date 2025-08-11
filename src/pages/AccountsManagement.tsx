import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: 'admin' | 'editor' | 'viewer';
}

const Admin = () => {
  const { t, language } = useLanguage();
  const { user, userRole } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch users
  useEffect(() => {
    async function fetchUsers() {
      if (userRole !== 'admin') return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: t('error'),
          description: t('errorFetchingUsers'),
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }
    
    if (userRole === 'admin') {
      fetchUsers();
    }
  }, [userRole]);
  
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      console.log('Creating user with email:', email);
      console.log('Creating user with role:', role);
      console.log('Creating user with fullName:', fullName);
      
      // First check if the user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      if (checkError) {
        console.error('Error checking existing user:', checkError);
      }
      
      if (existingUser) {
        throw new Error('A user with this email already exists');
      }
      
      // Create the user with proper metadata
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
          emailRedirectTo: undefined, // Disable email confirmation for admin-created users
        },
      });
      
      if (signUpError) {
        console.error('SignUp error details:', {
          message: signUpError.message,
          status: signUpError.status,
          details: signUpError
        });
        
        // Provide more specific error messages
        if (signUpError.message.includes('User already registered')) {
          throw new Error('A user with this email is already registered');
        } else if (signUpError.message.includes('Password')) {
          throw new Error('Password must be at least 6 characters long');
        } else if (signUpError.message.includes('Email')) {
          throw new Error('Please provide a valid email address');
        }
        
        throw signUpError;
      }
      
      if (!authData.user) {
        throw new Error('Failed to create user - no user data returned');
      }
      
      console.log('User created successfully:', authData.user.id);
      console.log('Auth user metadata:', authData.user.user_metadata);
      
      // Wait a moment for the trigger to complete
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Check if profile was created by trigger
      const { data: existingProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();
        
      if (profileCheckError) {
        console.error('Error checking profile:', profileCheckError);
      }
      
      console.log('Profile check result:', existingProfile);
      
      if (!existingProfile) {
        console.log('Profile not found, creating manually...');
        // Manually create profile if trigger didn't work
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: email,
            full_name: fullName,
            role: role,
          });
          
        if (insertError) {
          console.error('Error creating profile manually:', insertError);
          throw new Error(`Failed to create user profile: ${insertError.message}`);
        }
        
        console.log('Profile created manually');
      } else {
        console.log('Profile exists, updating role...');
        // Update the role if profile exists but role is different
        if (existingProfile.role !== role || existingProfile.full_name !== fullName) {
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ role: role, full_name: fullName })
            .eq('id', authData.user.id);
            
          if (updateError) {
            console.error('Error updating profile role:', updateError);
            throw new Error(`Failed to update user profile: ${updateError.message}`);
          }
          
          console.log('Profile updated successfully');
        }
      }
      
      toast({
        description: t('userCreatedSuccessfully'),
      });
      
      // Clear form
      setEmail('');
      setPassword('');
      setFullName('');
      setRole('editor');
      
      // Refresh user list
      const { data: updatedUsers, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (fetchError) {
        console.error('Error fetching updated users:', fetchError);
      } else {
        setUsers(updatedUsers || []);
      }
      
    } catch (error: any) {
      console.error('Error creating user:', error);
      
      let errorMessage = error.message || t('errorCreatingUser');
      
      // Handle specific error cases
      if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
        errorMessage = 'A user with this email already exists';
      } else if (error.message?.includes('Password')) {
        errorMessage = 'Password must be at least 6 characters long';
      } else if (error.message?.includes('Email')) {
        errorMessage = 'Please provide a valid email address';
      } else if (error.message?.includes('Database error')) {
        errorMessage = 'Database error occurred. Please check the console for details.';
      }
      
      toast({
        title: t('error'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChangeRole = async (userId: string, newRole: 'admin' | 'editor' | 'viewer') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) throw error;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      
      toast({
        description: t('roleUpdatedSuccessfully'),
      });
    } catch (error) {
      console.error('Error updating role:', error);
    
      toast({
        title: t('error'),
        description: t('errorUpdatingRole'),
        variant: 'destructive',
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-[700px] mx-auto">
        <div className="bg-[#F4F7FF] dark:bg-dark-2 rounded-lg px-8 py-8 text-center shadow-lg sm:px-12 md:px-[60px]">
          <Card className="bg-transparent shadow-none border-none">
            <CardHeader>
              <CardTitle>{t('createNewUser')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t('fullName')}</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">{t('role')}</Label>
                    <Select
                      value={role}
                      onValueChange={(value: any) => setRole(value)}
                      dir={language === "ar" ? "rtl" : "ltr"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('selectRole')} className={language === "ar" ? "text-right" : "text-left"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin" className={language === "ar" ? "text-right" : "text-left"}>{t('admin')}</SelectItem>
                        <SelectItem value="editor" className={language === "ar" ? "text-right" : "text-left"}>{t('editor')}</SelectItem>
                        <SelectItem value="viewer" className={language === "ar" ? "text-right" : "text-left"}>{t('viewer')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full py-6 mt-4">
                  {isSubmitting ? t('creating') : t('createUser')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="container mx-auto py-8 mt-8" dir={language === "ar" ? "rtl" : "ltr"}>
        <Card>
          <CardHeader>
            <CardTitle className={language === "ar" ? "text-right" : "text-left"}>{t('manageUsers')}</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">{t('loading')}</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className={language === "ar" ? "text-right" : "text-left"}>{t('name')}</TableHead>
                      <TableHead className={language === "ar" ? "text-right" : "text-left"}>{t('email')}</TableHead>
                      <TableHead className={language === "ar" ? "text-right" : "text-left"}>{t('role')}</TableHead>
                      <TableHead className={language === "ar" ? "text-right" : "text-left"}>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className={language === "ar" ? "text-right" : "text-left"}>{user.full_name || '-'}</TableCell>
                        <TableCell className={language === "ar" ? "text-right" : "text-left"}>{user.email}</TableCell>
                        <TableCell className={language === "ar" ? "text-right" : "text-left"}>{user.role}</TableCell>
                        <TableCell className={language === "ar" ? "text-right" : "text-left"}>
                          <Select 
                            value={user.role} 
                            onValueChange={(value: any) => handleChangeRole(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">{t('admin')}</SelectItem>
                              <SelectItem value="editor">{t('editor')}</SelectItem>
                              <SelectItem value="viewer">{t('viewer')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
