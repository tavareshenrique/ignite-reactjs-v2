import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, Check, Search, Truck, X } from 'lucide-react';
import { useState } from 'react';

import { approveOrder } from '@/api/approve-order';
import { cancelOrder } from '@/api/cancel-order';
import { deliverOrder } from '@/api/deliver-order';
import { dispatchOrder } from '@/api/dispatch-order';
import { IGetOrdersResponse, TOrder, TOrderStatus } from '@/api/get-orders';
import { OrderStatus } from '@/components/order-status';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { TableCell, TableRow } from '@/components/ui/table';

import { OrdersDetails } from './order-details';

export interface IOrderTableRowProps {
  order: TOrder;
}

export function OrderTableRow({ order }: IOrderTableRowProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: TOrderStatus) {
    const ordersListCache = queryClient.getQueriesData<IGetOrdersResponse>({
      queryKey: ['orders'],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData<IGetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return {
              ...order,
              status,
            };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'canceled');
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'processing');
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivering');
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, 'delivered');
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do Pedido</span>
            </Button>
          </DialogTrigger>

          <OrdersDetails open={isDetailOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </TableCell>
      <TableCell>
        {order.status === 'pending' && (
          <Button
            onClick={() =>
              approveOrderFn({
                orderId: order.orderId,
              })
            }
            disabled={isApprovingOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" />
            Aprovar
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            onClick={() =>
              dispatchOrderFn({
                orderId: order.orderId,
              })
            }
            disabled={isDispatchingOrder}
            variant="outline"
            size="xs"
          >
            <Truck className="mr-2 h-3 w-3" />
            Em entrega
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            onClick={() =>
              deliverOrderFn({
                orderId: order.orderId,
              })
            }
            disabled={isDeliveringOrder}
            variant="outline"
            size="xs"
          >
            <Check className="mr-2 h-3 w-3" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() =>
            cancelOrderFn({
              orderId: order.orderId,
            })
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
