import { api } from '@/lib/axios';

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

export async function getOrders(): Promise<IGetOrdersResponse> {
  const response = await api.get<IGetOrdersResponse>('/orders', {
    params: {
      pageIndex: 0,
    },
  });

  console.log('response', response.data);

  return response.data;
}
