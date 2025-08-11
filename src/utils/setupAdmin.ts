
import { supabase } from '@/integrations/supabase/client';

// This function creates an admin user
// Only run this once and through the console
export async function createAdminUser() {
  try {
    // First sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'anas@example.com',
      password: '123456',
      options: {
        data: {
          full_name: 'Anas'
        }
      }
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error('User creation failed');
    }
    
    console.log('User created successfully with ID:', authData.user.id);
    
    // Set the user role to admin in the profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', authData.user.id);

    if (updateError) {
      throw updateError;
    }
    
    console.log('User role updated to admin successfully');
    return {
      success: true,
      message: 'Admin user created successfully. Email: anas@example.com, Password: 123456'
    };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return {
      success: false,
      message: `Error creating admin user: ${error.message}`
    };
  }
}

// Export a utility function to run this from the console
window.createAdmin = async () => {
  const result = await createAdminUser();
  alert(result.message);
  return result;
};

// Type declaration to avoid TS errors
declare global {
  interface Window {
    createAdmin: () => Promise<{success: boolean, message: string}>;
  }
}
