import { faker } from '@faker-js/faker';

import { api } from '@/lib/axios';

export interface IGetOrdersQuery {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
}

export type TOrderStatus =
  | 'pending'
  | 'canceled'
  | 'processing'
  | 'delivering'
  | 'delivered';

export type TOrder = {
  orderId: string;
  createdAt: string;
  status: TOrderStatus;
  customerName: string;
  total: number;
};

export type TMetaOrder = {
  pageIndex: number;
  perPage: number;
  totalCount: number;
};

export interface IGetOrdersResponse {
  orders: TOrder[];
  meta: TMetaOrder;
}

export async function getOrders({
  pageIndex,
  customerName,
  orderId,
  status,
}: IGetOrdersQuery): Promise<IGetOrdersResponse> {
  const response = await api.get<IGetOrdersResponse>('/orders', {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });

  // Provisório para resolver o problema do Back-End
  const parseOrdersResponse = response.data.orders.map((order) => {
    const createdAt = faker.date
      .recent({
        days: 40,
      })
      .toLocaleDateString();

    return {
      ...order,
      createdAt,
    };
  });

  return {
    ...response.data,
    orders: parseOrdersResponse,
  };
}
