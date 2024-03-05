import { api } from '@/lib/axios';

export interface ICancelOrderParams {
  orderId: string;
}

export async function cancelOrder({ orderId }: ICancelOrderParams) {
  await api.patch(`/orders/${orderId}/cancel`);
}
