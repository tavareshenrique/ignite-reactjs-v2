import { api } from '@/lib/axios';

interface IGetProfileResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: 'manager' | 'customer';
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfile(): Promise<IGetProfileResponse> {
  const response = await api.get<IGetProfileResponse>('/me');

  return response.data;
}
