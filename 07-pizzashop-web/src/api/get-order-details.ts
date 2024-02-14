import { faker } from '@faker-js/faker';

import { api } from '@/lib/axios';

interface IGetOrderDetailsParams {
  orderId: string;
}

export interface IOrderDetailsResponse {
  id: string;
  createdAt: string;
  status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered';
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails({
  orderId,
}: IGetOrderDetailsParams): Promise<IOrderDetailsResponse> {
  const response = await api.get<IOrderDetailsResponse>(`/orders/${orderId}`);

  // Provisório para resolver o problema do Back-End
  const createdAt = faker.date
    .recent({
      days: 40,
    })
    .toLocaleDateString();

  console.log(response.data);

  return {
    ...response.data,
    createdAt,
  };
}
