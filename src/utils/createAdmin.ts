
import { supabase } from '@/integrations/supabase/client';

export async function createProfileForExistingUser(userId: string, email: string, fullName: string, role: 'admin' | 'editor' | 'viewer' = 'admin') {
  try {
    console.log('Creating profile for existing user:', userId);
    console.log('Email:', email);
    console.log('Full name:', fullName);
    console.log('Role:', role);
    
    // Check if profile already exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing profile:', checkError);
      throw new Error(`Failed to check existing profile: ${checkError.message}`);
    }
    
    if (existingProfile) {
      console.log('Profile already exists, updating role...');
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          role: role, 
          full_name: fullName,
          email: email
        })
        .eq('id', userId);
        
      if (updateError) {
        console.error('Error updating profile:', updateError);
        throw new Error(`Failed to update profile: ${updateError.message}`);
      }
      
      return {
        success: true,
        message: 'Profile updated successfully'
      };
    }
    
    // Create new profile
    const { error: insertError } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        email: email,
        full_name: fullName,
        role: role,
      });
      
    if (insertError) {
      console.error('Error creating profile:', insertError);
      throw new Error(`Failed to create profile: ${insertError.message}`);
    }
    
    console.log('Profile created successfully');
    
    return {
      success: true,
      message: 'Profile created successfully'
    };
    
  } catch (error: any) {
    console.error('Error creating profile for existing user:', error);
    return {
      success: false,
      error: error.message,
      message: error.message
    };
  }
}

export async function createAdminUser(email: string, password: string, fullName: string) {
  try {
    console.log('Creating admin user with email:', email);
    console.log('Full name:', fullName);
    
    // First check if user already exists in profiles
    const { data: existingProfile, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();
      
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking existing profile:', checkError);
    }
    
    if (existingProfile) {
      console.log('User profile already exists:', existingProfile);
      
      // Check if the existing user is already an admin
      if (existingProfile.role === 'admin') {
        return {
          success: true,
          user: null,
          message: 'Admin user already exists and is properly configured'
        };
      } else {
        // Update existing user to admin role
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            role: 'admin', 
            full_name: fullName 
          })
          .eq('id', existingProfile.id);
          
        if (updateError) {
          console.error('Error updating existing profile to admin:', updateError);
          throw new Error(`Failed to update user to admin: ${updateError.message}`);
        }
        
        return {
          success: true,
          user: null,
          message: 'Existing user updated to admin successfully'
        };
      }
    }
    
    // Try to sign up the user
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'admin',
        },
      },
    });
    
    if (signUpError) {
      console.error('SignUp error:', signUpError);
      
      // If user already exists in auth, that's okay
      if (signUpError.message?.includes('already registered') || signUpError.message?.includes('already exists')) {
        console.log('User already exists in auth, checking for profile...');
        
        // Try to find the user by email and create profile if needed
        const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
        
        if (listError) {
          console.error('Error listing users:', listError);
          throw new Error('Failed to check existing users');
        }
        
        // Add proper type checking and null safety
        const usersList = usersData?.users || [];
        const existingUser = usersList.find(u => u && u.email === email);
        
        if (existingUser) {
          console.log('Found existing auth user:', existingUser.id);
          
          // Check if profile exists for this auth user
          const { data: profileCheck, error: profileCheckError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', existingUser.id)
            .maybeSingle();
            
          if (profileCheckError && profileCheckError.code !== 'PGRST116') {
            console.error('Error checking profile by ID:', profileCheckError);
          }
          
          if (!profileCheck) {
            // Create profile for existing auth user
            const { error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: existingUser.id,
                email: email,
                full_name: fullName,
                role: 'admin',
              });
              
            if (insertError) {
              console.error('Error creating profile for existing user:', insertError);
              throw new Error(`Failed to create profile: ${insertError.message}`);
            }
            
            console.log('Profile created for existing auth user');
          } else if (profileCheck.role !== 'admin') {
            // Update existing profile to admin
            const { error: updateError } = await supabase
              .from('profiles')
              .update({ 
                role: 'admin', 
                full_name: fullName 
              })
              .eq('id', existingUser.id);
              
            if (updateError) {
              console.error('Error updating profile to admin:', updateError);
              throw new Error(`Failed to update profile: ${updateError.message}`);
            }
            
            console.log('Profile updated to admin');
          }
          
          return {
            success: true,
            user: existingUser,
            message: 'Admin user configured successfully'
          };
        }
      }
      
      throw signUpError;
    }
    
    if (!authData.user) {
      throw new Error('Failed to create user - no user data returned');
    }
    
    console.log('User created successfully:', authData.user.id);
    console.log('Auth user metadata:', authData.user.user_metadata);
    
    // Wait for trigger to complete
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Check if profile was created
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .maybeSingle();
      
    console.log('Profile check result:', profile);
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error checking profile:', profileError);
    }
    
    if (!profile) {
      console.log('Profile not created by trigger, creating manually...');
      
      // Create profile manually if trigger didn't work
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: 'admin',
        });
        
      if (insertError) {
        console.error('Error creating profile manually:', insertError);
        
        // If it's a duplicate key error, the profile might already exist
        if (insertError.code === '23505') {
          console.log('Profile already exists, updating role...');
          
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              role: 'admin', 
              full_name: fullName 
            })
            .eq('id', authData.user.id);
            
          if (updateError) {
            console.error('Error updating existing profile:', updateError);
            throw new Error(`Failed to update profile: ${updateError.message}`);
          }
          
          console.log('Profile updated successfully');
        } else {
          throw new Error(`Failed to create user profile: ${insertError.message}`);
        }
      } else {
        console.log('Profile created manually');
      }
    } else {
      console.log('Profile exists, updating role if needed...');
      
      // Ensure the profile has admin role
      if (profile.role !== 'admin' || profile.full_name !== fullName) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ 
            role: 'admin', 
            full_name: fullName 
          })
          .eq('id', authData.user.id);
          
        if (updateError) {
          console.error('Error updating profile:', updateError);
          throw new Error(`Failed to update user profile: ${updateError.message}`);
        }
        
        console.log('Profile updated successfully');
      }
    }
    
    return {
      success: true,
      user: authData.user,
      message: 'Admin user created successfully'
    };
    
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    
    let errorMessage = error.message || 'Failed to create admin user';
    
    // Handle specific error cases
    if (error.message?.includes('already registered') || error.message?.includes('already exists')) {
      errorMessage = 'Admin user already exists and is configured';
      // Return success for already existing admin
      return {
        success: true,
        user: null,
        message: errorMessage
      };
    } else if (error.message?.includes('Password')) {
      errorMessage = 'Password must be at least 6 characters long';
    } else if (error.message?.includes('Email')) {
      errorMessage = 'Please provide a valid email address';
    } else if (error.message?.includes('Database error')) {
      errorMessage = 'Database error occurred. Please check the console for details.';
    }
    
    return {
      success: false,
      error: errorMessage,
      message: errorMessage
    };
  }
}
