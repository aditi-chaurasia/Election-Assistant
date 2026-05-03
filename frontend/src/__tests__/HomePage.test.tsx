import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(<HomePage />);
    expect(screen.getByText(/Welcome to Election Assistant India/i)).toBeInTheDocument();
  });

  it('displays feature cards', () => {
    render(<HomePage />);
    expect(screen.getByText(/Step-by-Step Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/Important Dates/i)).toBeInTheDocument();
    expect(screen.getByText(/AI Chatbot/i)).toBeInTheDocument();
  });

  it('has accessible buttons', () => {
    render(<HomePage />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
