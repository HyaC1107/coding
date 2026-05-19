import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'gray' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', fullWidth, style, children, ...props }) => {
  const baseStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: 'var(--border-radius)',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'opacity 0.2s',
    width: fullWidth ? '100%' : 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const variants = {
    primary: { backgroundColor: 'var(--color-primary)', color: 'white' },
    dark: { backgroundColor: 'var(--color-dark)', color: 'white' },
    gray: { backgroundColor: 'var(--color-gray)', color: 'white' },
    outline: { backgroundColor: 'transparent', color: 'var(--color-primary)', border: '2px solid var(--color-primary)' },
  };

  return (
    <button style={{ ...baseStyle, ...variants[variant], ...style }} {...props}>
      {children}
    </button>
  );
};

export default Button;
