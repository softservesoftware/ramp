import { useState, useEffect } from "react";
import React from 'react';
export function CostCalculator() {
    const [contractValue, setContractValue] = useState(100);
    const [timeline, setTimeline] = useState(5);
    const [calculatedValues, setCalculatedValues] = useState<{
        existing: number[];
        ramp: number[];
        savings: number[];
        totals: { existing: number; ramp: number; savings: number };
    }>({
        existing: [],
        ramp: [],
        savings: [],
        totals: { existing: 0, ramp: 0, savings: 0 }
    });

    useEffect(() => {
        // Create arrays filled with initial values
        const existing = Array(timeline).fill(contractValue);
        const ramp = Array(timeline).fill(0);

        // Apply RAMP fee structure
        ramp[0] = contractValue * 0.5;  // 50% of savings in year 1
        if (timeline > 1) ramp[1] = contractValue * 0.25;  // 25% in year 2
        if (timeline > 2) ramp[2] = contractValue * 0.125; // 12.5% in year 3

        // Calculate savings and totals
        const savings = existing.map((val, idx) => val - ramp[idx]);
        const totals = {
            existing: existing.reduce((sum, val) => sum + val, 0),
            ramp: ramp.reduce((sum, val) => sum + val, 0),
            savings: savings.reduce((sum, val) => sum + val, 0)
        };

        setCalculatedValues({ existing, ramp, savings, totals });
    }, [contractValue, timeline]);

    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm my-4 md:my-6">
            <h3 className="text-lg md:text-xl font-medium mb-3">Cost Savings Calculator</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Fully Burdened Annual Cost of Software (in $M)
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={contractValue}
                        onChange={(e) => setContractValue(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">
                        Timeline (years)
                    </label>
                    <input
                        type="number"
                        min="2"
                        max="10"
                        value={timeline}
                        onChange={(e) => setTimeline(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Type
                                </th>
                                {Array.from({ length: timeline }).map((_, idx) => (
                                    <th key={idx} className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Year {idx + 1}
                                    </th>
                                ))}
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td className="px-3 py-2 text-sm font-medium">Existing</td>
                                {calculatedValues.existing.map((val, idx) => (
                                    <td key={idx} className="px-3 py-2 text-sm">${val}M</td>
                                ))}
                                <td className="px-3 py-2 text-sm font-semibold">${calculatedValues.totals.existing}M</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 text-sm font-medium">RAMP</td>
                                {calculatedValues.ramp.map((val, idx) => (
                                    <td key={idx} className="px-3 py-2 text-sm">${val}M</td>
                                ))}
                                <td className="px-3 py-2 text-sm font-semibold">${calculatedValues.totals.ramp}M</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 text-sm font-medium">Net Savings</td>
                                {calculatedValues.savings.map((val, idx) => (
                                    <td key={idx} className="px-3 py-2 text-sm text-green-600 dark:text-green-400">${val}M</td>
                                ))}
                                <td className="px-3 py-2 text-sm font-semibold text-green-600 dark:text-green-400">${calculatedValues.totals.savings}M</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 