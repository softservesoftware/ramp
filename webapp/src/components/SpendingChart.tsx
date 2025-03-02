import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import React from 'react';

export function SpendingChart({ data }: { data: any }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm my-4 md:my-6">
      <h3 className="text-lg md:text-xl font-medium mb-3">NAICS 5415 Spending Projection</h3>
      <div className="h-[300px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" label={{ value: 'Fiscal Year', position: 'insideBottom', offset: -10 }} />
            <YAxis
              label={{ value: 'Billions USD', angle: -90, position: 'insideLeft', offset: 5 }}
              tickFormatter={(value) => `$${value}B`}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}B`, 'Annual Spend']}
              labelFormatter={(label: string) => `Fiscal Year ${label}`}
            />
            <Bar
              dataKey="amount"
              name="Spending"
              fill="#2563eb"
              // Use fill pattern for projected values
              fillOpacity={((entry: any) => entry.projected ? 0.7 : 1) as any}
              stroke={((entry: any) => entry.projected ? "#2563eb" : "none") as any}
              strokeDasharray={((entry: any) => entry.projected ? "5 5" : "0") as any}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-gray-500 mt-2 italic">Data source: USASpending.gov (2019-2024), Projected with 9.22% CAGR (2025-2028)</p>
    </div>
  );
} 