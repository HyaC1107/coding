export interface AuthInfo {
  token: string;
  userId: string;
  name: string;
  type: 'customer' | 'constructor' | 'heavy';
}

export const saveAuth = (info: AuthInfo) => {
  localStorage.setItem('token', info.token);
  localStorage.setItem('auth', JSON.stringify(info));
};

export const getAuth = (): AuthInfo | null => {
  const raw = localStorage.getItem('auth');
  return raw ? JSON.parse(raw) : null;
};

export const clearAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('auth');
};
