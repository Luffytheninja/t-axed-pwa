'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'outline-light' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 uppercase tracking-widest text-[13px]';

  const variants = {
    // Primary: Deep Navy (high trust)
    primary: 'bg-primary text-on-dark hover:bg-primary-light focus-visible:ring-primary',
    // Accent: Warm Coral (call to action)
    accent:
      'bg-accent text-white hover:bg-accent-light focus-visible:ring-accent shadow-lg shadow-accent/20',
    // Outline on light backgrounds
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-on-dark focus-visible:ring-primary',
    // Outline on dark backgrounds
    'outline-light':
      'border-2 border-on-dark/50 text-on-dark hover:bg-on-dark hover:text-primary focus-visible:ring-on-dark',
    // Ghost
    ghost: 'text-primary hover:bg-muted focus-visible:ring-primary',
  };

  const sizes = {
    sm: 'px-6 py-2.5',
    md: 'px-8 py-3',
    lg: 'px-10 py-4',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
