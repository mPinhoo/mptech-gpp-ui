"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type ChartType = "line" | "bar" | "area";

interface ChartDataPoint {
  [key: string]: string | number;
}

interface ChartSeries {
  dataKey: string;
  color?: string;
  name?: string;
}

interface ChartProps {
  type?: ChartType;
  data: ChartDataPoint[];
  series: ChartSeries[];
  xAxisKey: string;
  height?: number;
  className?: string;
}

const defaultColors = [
  "oklch(0.45 0.2 264)",
  "oklch(0.55 0.17 152)",
  "oklch(0.7 0.15 75)",
  "oklch(0.55 0.2 27)",
];

export function Chart({
  type = "line",
  data,
  series,
  xAxisKey,
  height = 300,
  className,
}: ChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={className} style={{ width: "100%", height }} />;
  }

  const renderChart = () => {
    const commonProps = { data, margin: { top: 5, right: 20, left: 0, bottom: 5 } };

    switch (type) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--card-foreground)",
              }}
            />
            <Legend />
            {series.map((s, i) => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                fill={s.color || defaultColors[i % defaultColors.length]}
                name={s.name || s.dataKey}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--card-foreground)",
              }}
            />
            <Legend />
            {series.map((s, i) => (
              <Area
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color || defaultColors[i % defaultColors.length]}
                fill={s.color || defaultColors[i % defaultColors.length]}
                fillOpacity={0.1}
                name={s.name || s.dataKey}
              />
            ))}
          </AreaChart>
        );
      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--card-foreground)",
              }}
            />
            <Legend />
            {series.map((s, i) => (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                stroke={s.color || defaultColors[i % defaultColors.length]}
                name={s.name || s.dataKey}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className={className} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
}
