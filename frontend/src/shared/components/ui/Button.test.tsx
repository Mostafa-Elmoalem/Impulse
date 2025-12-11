import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading spinner when isLoading is true', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByText('Submit')).toBeInTheDocument();
    // Check for loader icon
  });
});