import { api } from '@/lib/axios';

export interface IRegisterRestaurantBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function registerRestaurant({
  restaurantName,
  managerName,
  email,
  phone,
}: IRegisterRestaurantBody) {
  await api.post('/restaurants', { restaurantName, managerName, email, phone });
}
