import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { loginWithEmail } from '@/features/auth/api/authApi';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required"), 
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // ✅ Matches the updated AuthResponse type
      const response = await loginWithEmail(data);
      
      // ✅ Passes explicit email from form, as backend TokenDto doesn't include it
      login(response.token, data.email, response.roles);
      
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.messageEn || error.message || 'Login failed';
      toast.error(message);
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-brand-600 mb-6">
          Welcome to Impulse
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input 
            label="Email"
            type="email"
            error={errors.email?.message}
            placeholder="you@example.com"
            {...register('email')}
          />

          <Input 
            label="Password"
            type="password"
            error={errors.password?.message}
            placeholder="••••••••"
            {...register('password')}
          />

          <Button 
            type="submit" 
            fullWidth 
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};