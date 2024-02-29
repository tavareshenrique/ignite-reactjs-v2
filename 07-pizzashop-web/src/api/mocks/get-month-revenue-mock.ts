import { http, HttpResponse } from 'msw';

import { IGetMonthRevenueResponse } from '../get-month-revenue';

export const getMonthRevenueMock = http.get<
  never,
  never,
  IGetMonthRevenueResponse
>('/metrics/month-receipt', () => {
  return HttpResponse.json({
    receipt: 20000,
    diffFromLastMonth: 10,
  });
});
