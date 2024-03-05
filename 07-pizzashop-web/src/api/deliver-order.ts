import { api } from '@/lib/axios';

export interface IDeliverOrderParams {
  orderId: string;
}

export async function deliverOrder({ orderId }: IDeliverOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`);
}
