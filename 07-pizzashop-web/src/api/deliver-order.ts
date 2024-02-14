import { api } from '@/lib/axios';

interface IDeliverOrderParams {
  orderId: string;
}

export async function deliverOrder({ orderId }: IDeliverOrderParams) {
  await api.patch(`/orders/${orderId}/deliver`);
}
