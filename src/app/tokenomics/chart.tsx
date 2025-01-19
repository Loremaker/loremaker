"use client";

import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const tokenomicsData = [
  {
    title: "Circulating Supply",
    description: "The total number of tokens in circulation.",
    value: 85,
  },
  {
    title: "Community Treasury",
    description: "To be used for community initiatives and rewards.",
    value: 10,
  },
  {
    title: "Team",
    description:
      "Locked funds for 1 year, to be distributed over 12 months as an allowance for developers.",
    value: 5,
  },
];

const options: ApexOptions = {
  chart: {
    id: "tokenomics-pie",
    background: "transparent",
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return value + "%";
      },
    },
  },
  legend: {
    show: false,
  },
  colors: ["#3b82f6", "#10b981", "#f97316"],
  labels: tokenomicsData.map((item) => item.title),
  theme: {
    mode: "dark",
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const series = tokenomicsData.map((item) => item.value);

export function TokenomicsChart() {
  return (
    <Chart
      options={options}
      series={series}
      type="pie"
      width={300}
      height={300}
    />
  );
}
