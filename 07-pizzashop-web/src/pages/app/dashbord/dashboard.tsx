import { Helmet } from 'react-helmet-async';

import { DayOrdersAmountCard } from '././cards/day-orders-amount-card';
import { MonthCanceledOrdersAmountCard } from '././cards/month-canceled-orders-amount';
import { MonthOrdersAmountCard } from '././cards/month-orders-amount-card';
import { MonthRevenueCard } from './cards/month-revenue-card';
import { PopularProductsChart } from './charts/popular-products-chart';
import { RevenueChart } from './charts/revenue-chart';

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersAmountCard />
          <DayOrdersAmountCard />
          <MonthCanceledOrdersAmountCard />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  );
}
