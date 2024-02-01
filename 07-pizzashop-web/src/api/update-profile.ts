import { api } from '@/lib/axios';

interface IUpdateProfileBody {
  name: string | null;
  description: string | null;
}

export async function updateProfile({ name, description }: IUpdateProfileBody) {
  await api.put('/profile', {
    name,
    description,
  });
}
