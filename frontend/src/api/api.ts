const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');

  const headersObj: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) headersObj['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_URL + path, { ...options, headers: headersObj });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}
