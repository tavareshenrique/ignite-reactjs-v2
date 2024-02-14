import { api } from '@/lib/axios';

export interface IGetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  const response = await api.get<IGetDayOrdersAmountResponse>(
    '/metrics/day-orders-amount',
  );

  return response.data;
}
