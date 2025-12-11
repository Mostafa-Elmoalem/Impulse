import { useMutation } from '@tanstack/react-query';
import { loginWithEmail } from '../api/authApi';
import { useAuthStore } from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginWithEmail,
    onSuccess: (data) => {
      login(data.user, data.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      // TODO: Show toast notification
    },
  });
};