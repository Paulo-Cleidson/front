import axios from 'axios';

export const login = async (credentials: { username: string; password: string }): Promise<boolean> => {
  try {
    console.log("Sending login request with:", credentials);
    
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/token/`,
      {
        username: credentials.username,
        password: credentials.password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Login response data:", response.data);
    
    if (response.data.access) {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('username', credentials.username);
      return true;
    }
    
    return false;
  } catch (error: any) {
    console.error('Login error:', error.response?.data);
    return false;
  }
};

export const logout = (): void => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('username');
  // No redirect here - let components handle navigation
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('access_token');
};

export const getCurrentUser = (): string | null => {
  return localStorage.getItem('username');
};