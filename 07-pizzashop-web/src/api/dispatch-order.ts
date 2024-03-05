import { api } from '@/lib/axios';

export interface IDispatchOrderParams {
  orderId: string;
}

export async function dispatchOrder({ orderId }: IDispatchOrderParams) {
  await api.patch(`/orders/${orderId}/dispatch`);
}
