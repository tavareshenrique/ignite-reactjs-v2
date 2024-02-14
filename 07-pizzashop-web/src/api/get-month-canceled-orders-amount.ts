import { api } from '@/lib/axios';

export interface IGetMonthCanceledOrdersAmountResponse {
  amount: number;
  diffFromLastMonth: number;
}

export async function getMonthCanceledOrdersAmount() {
  const response = await api.get<IGetMonthCanceledOrdersAmountResponse>(
    '/metrics/month-canceled-orders-amount',
  );

  return response.data;
}
