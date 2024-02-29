import { api } from '@/lib/axios';

export interface IGetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export type IGetDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod({
  from,
  to,
}: IGetDailyRevenueInPeriodQuery) {
  const response = await api.get<IGetDailyRevenueInPeriodResponse>(
    '/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  );

  return response.data;
}
