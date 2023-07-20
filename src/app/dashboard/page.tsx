"use client";
import React from "react";
import {
  Card,
  Text,
  Metric,
  Flex,
  ProgressBar,
  Title,
  AreaChart,
  DonutChart,
  BarChart,
  Subtitle,
} from "@tremor/react";

const lineChartdata = [
  {
    date: "Jan 22",
    Orders: 2890,
    "Cancelled Orders": 2338,
  },
  {
    date: "Feb 22",
    Orders: 2756,
    "Cancelled Orders": 2103,
  },
  {
    date: "Mar 22",
    Orders: 3322,
    "Cancelled Orders": 2194,
  },
  {
    date: "Apr 22",
    Orders: 3470,
    "Cancelled Orders": 2108,
  },
  {
    date: "May 22",
    Orders: 3475,
    "Cancelled Orders": 1812,
  },
  {
    date: "Jun 22",
    Orders: 3129,
    "Cancelled Orders": 1726,
  },
];
const cities = [
  {
    name: "New York",
    sales: 9800,
  },
  {
    name: "London",
    sales: 4567,
  },
  {
    name: "Hong Kong",
    sales: 3908,
  },
  {
    name: "San Francisco",
    sales: 2400,
  },
  {
    name: "Singapore",
    sales: 1908,
  },
  {
    name: "Zurich",
    sales: 1398,
  },
];
const barChartdata = [
  {
    name: "Bag",
    Sold: 2488,
  },
  {
    name: "Car",
    Sold: 1445,
  },
  {
    name: "Table",
    Sold: 743,
  },
  {
    name: "Aquarium",
    Sold: 312,
  },
  {
    name: "Watch",
    Sold: 123,
  },
];

const barDataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};
const chartDataFormatter = (number: number) => {
  return "$ " + Intl.NumberFormat("us").format(number).toString();
};
const Dashboard = () => {
  const valueFormatter = (number: number) =>
    `$ ${Intl.NumberFormat("us").format(number).toString()}`;

  return (
    <div className="bg-black  min-h-screen">
      <div className=" max-w-full py-16 px-6 sm:py-24 lg:max-w-full md:px-24 ">
        <h1 className="text-4xl mb-4 text-gray-300">Analytics Dashboard</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-1  xl:gap-x-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2 ">
            <Card className="max-w-full h-full">
              <Text>Total Orders</Text>
              <Metric>71,465</Metric>
              <Flex className=" h-24">
                <Text>32% of annual target</Text>
                <Text>225,000</Text>
              </Flex>
              <ProgressBar value={32} className=" bg-white" color="indigo" />
            </Card>
            <Card className="max-w-full mx-auto">
              <Text>Sales</Text>
              <Metric>$ 2,011,465</Metric>
              <Flex className=" h-24">
                <Text>10% of annual target</Text>
                <Text>$ 20,225,000</Text>
              </Flex>
              <ProgressBar value={10} className=" bg-white" color="indigo" />
            </Card>
            <Card className="max-w-full">
              <Title>Customer Demography</Title>
              <DonutChart
                className="mt-6 text-white"
                data={cities}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-2 ">
            <Card>
              <Title>Hot Products</Title>

              <BarChart
                className="w-full"
                data={barChartdata}
                index="name"
                categories={["Sold"]}
                colors={["indigo"]}
                valueFormatter={barDataFormatter}
                yAxisWidth={64}
              />
            </Card>
            <div className=" w-full overflow-hidden rounded-md bg-gray-700 hover:opacity-95 sm-h:36 lg:h-full">
              <Card>
                <Title>Revenue Generated</Title>
                <AreaChart
                  className="h-80 w-full"
                  data={lineChartdata}
                  index="date"
                  categories={["Orders", "Cancelled Orders"]}
                  colors={["indigo", "zinc"]}
                  valueFormatter={chartDataFormatter}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
