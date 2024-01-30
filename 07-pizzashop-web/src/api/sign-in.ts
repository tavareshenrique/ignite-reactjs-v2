import { api } from '@/lib/axios';

export interface ISignInBody {
  email: string;
}

export async function signIn({ email }: ISignInBody) {
  await api.post('/authenticate', { email });
}
