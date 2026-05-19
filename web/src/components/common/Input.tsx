import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, style, ...props }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    marginBottom: '16px',
  };

  const inputStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: 'var(--border-radius)',
    border: `1px solid ${error ? '#FF3120' : '#E6E6E6'}`,
    fontSize: '16px',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--color-dark)',
  };

  const errorStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#FF3120',
    marginTop: '-4px',
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <input style={{ ...inputStyle, ...style }} {...props} />
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
};

export default Input;
