import { Toaster } from 'sonner';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster position="top-right" richColors />
      </BrowserRouter>
    </QueryClientProvider>
  );
};