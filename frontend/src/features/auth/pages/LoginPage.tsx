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
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginWithEmail(data);
      login(response.token, data.email, response.roles);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.messageEn || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-brand-50 via-pink-50 to-purple-50
                    dark:from-gray-950 dark:via-gray-900 dark:to-gray-950
                    p-4 transition-colors">
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-200/30 dark:bg-brand-900/20 
                        rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-200/30 dark:bg-pink-900/20 
                        rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl 
                        border border-gray-200 dark:border-gray-800
                        backdrop-blur-sm animate-scale-in">
          
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-pink-500 
                            flex items-center justify-center text-white font-bold text-3xl 
                            shadow-lg">
              I
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Impulse
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          {/* Form */}
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
              className="mt-6"
            >
              Sign In
            </Button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
};