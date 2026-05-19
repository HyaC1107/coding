import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = '@auth_info';

export interface AuthInfo {
  token: string;
  userId: string;
  name: string;
  type: 'customer' | 'constructor' | 'heavy';
}

export const saveAuth = async (authInfo: AuthInfo) => {
  try {
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authInfo));
  } catch (e) {
    console.error('Failed to save auth info', e);
  }
};

export const getAuth = async (): Promise<AuthInfo | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to get auth info', e);
    return null;
  }
};

export const clearAuth = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_KEY);
  } catch (e) {
    console.error('Failed to clear auth info', e);
  }
};
