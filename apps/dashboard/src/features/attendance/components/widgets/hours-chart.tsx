"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@toolkit/ui/chart";
import React from "react";
import { Label, Pie, PieChart } from "recharts";

type ChartData = {
  worked: number;
  planned: number;
};

type HoursChartProps = {
  workedHours: number;
  scheduledHours: number;
};

export function HoursChart({ workedHours, scheduledHours }: HoursChartProps) {
  const isOvertime = workedHours > scheduledHours;
  const remainingHours = isOvertime ? 0 : scheduledHours - workedHours;
  const overtimeHours = isOvertime ? workedHours - scheduledHours : 0;
  const chartData = [
    { label: "worked", visitors: workedHours, fill: "var(--color-worked)" },
    {
      label: "remaining",
      visitors: remainingHours,
      fill: "var(--color-remaining)",
    },
    {
      label: "overtime",
      visitors: overtimeHours,
      fill: "var(--color-overtime)",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    worked: {
      label: "Worked",
      color: "hsl(var(--chart-1))",
    },
    remaining: {
      label: "Remaining",
      color: "hsl(var(--chart-2))",
    },
    overtime: {
      label: "Overtime",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[130px]">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="label"
          innerRadius={40}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-xl font-bold"
                    >
                      {workedHours.toFixed(2).toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Hours
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
