import { api } from '@/lib/axios';

export interface IGetMonthOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthOrdersAmount() {
  const response = await api.get<IGetMonthOrdersAmountResponse>(
    '/metrics/month-orders-amount',
  );

  return response.data;
}
