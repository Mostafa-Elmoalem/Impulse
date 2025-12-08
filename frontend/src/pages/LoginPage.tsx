import React, { useState } from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { loginWithEmail } from '@/features/auth/api/authApi';
import type { LoginCredentials } from '@/features/auth/types';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const credentials: LoginCredentials = { email, password };
      const response = await loginWithEmail(credentials);
      
      // Store token (you might want to use a state manager or context for this)
      localStorage.setItem('authToken', response.token);
      
      console.log('Login successful', response.user);
      // Redirect to dashboard or home page
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Login</h1>
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
    </div>
  );
};

export default LoginPage;
