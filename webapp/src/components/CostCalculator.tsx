import { useState, useEffect } from "react";
import React from 'react';

export function CostCalculator() {
    // Core inputs
    const [contractValue, setContractValue] = useState(100); // Original annual cost ($M)
    const [reducedCost, setReducedCost] = useState(10); // Default to 10M (10% of original cost)
    const [rebuildTime, setRebuildTime] = useState(1); // Years to rebuild
    const [analysisYears, setAnalysisYears] = useState(5); // Total years to analyze

    // Update reducedCost when contractValue changes to maintain the 10% default relationship
    useEffect(() => {
        setReducedCost(contractValue * 0.1);
    }, [contractValue]);

    // Derived values
    const annualSavings = contractValue - reducedCost;
    
    // Calculate results for each year
    const [calculatedValues, setCalculatedValues] = useState<{
        existing: number[];
        ramp: number[];
        savings: number[];
        totals: { existing: number; ramp: number; savings: number };
        payouts: number[];
    }>({
        existing: [],
        ramp: [],
        savings: [],
        payouts: [],
        totals: { existing: 0, ramp: 0, savings: 0 }
    });

    useEffect(() => {
        // Ensure we have at least rebuild time + 3 years for analysis
        const minAnalysisYears = rebuildTime + 3;
        if (analysisYears < minAnalysisYears) {
            setAnalysisYears(minAnalysisYears);
            return;
        }
        
        // Create arrays for the timeline
        const existing = Array(analysisYears).fill(contractValue);
        const ramp = Array(analysisYears).fill(0);
        const payouts = Array(analysisYears).fill(0);
        
        // During rebuild years, RAMP cost is $0
        for (let i = 0; i < rebuildTime; i++) {
            ramp[i] = 0; // All rebuild years cost $0
            payouts[i] = 0;
        }
        
        // After rebuild, costs drop to reduced amount plus team payouts
        for (let i = rebuildTime; i < analysisYears; i++) {
            // Base cost is the reduced annual cost
            ramp[i] = reducedCost;
            
            // Add team payouts for first 3 years after rebuild
            const yearsAfterRebuild = i - rebuildTime;
            if (yearsAfterRebuild === 0) {
                payouts[i] = annualSavings * 0.5; // 50% of savings in first year
            } else if (yearsAfterRebuild === 1) {
                payouts[i] = annualSavings * 0.25; // 25% in second year
            } else if (yearsAfterRebuild === 2) {
                payouts[i] = annualSavings * 0.125; // 12.5% in third year
            }
            
            // Add payout to RAMP cost
            ramp[i] += payouts[i];
        }
        
        // Calculate savings and totals
        const savings = existing.map((val, idx) => val - ramp[idx]);
        const totals = {
            existing: existing.reduce((sum, val) => sum + val, 0),
            ramp: ramp.reduce((sum, val) => sum + val, 0),
            savings: savings.reduce((sum, val) => sum + val, 0)
        };
        
        setCalculatedValues({ existing, ramp, savings, payouts, totals });
    }, [contractValue, reducedCost, rebuildTime, analysisYears, annualSavings]);

    // Calculate the percentage for display purposes
    const reducedCostPercent = contractValue > 0 ? (reducedCost / contractValue) * 100 : 0;

    return (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm my-4 md:my-6">
            <h3 className="text-lg md:text-xl font-medium mb-3">RAMP Cost Savings Calculator</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Current Annual Cost of Software (in $M)
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
                        Reduced Annual Cost after RAMP (in $M)
                    </label>
                    <input
                        type="number"
                        min="0"
                        max={contractValue}
                        value={reducedCost}
                        onChange={(e) => setReducedCost(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Rebuild Time (years)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rebuildTime}
                        onChange={(e) => setRebuildTime(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Analysis Timeline (years)
                    </label>
                    <input
                        type="number"
                        min={rebuildTime + 3}
                        max="15"
                        value={analysisYears}
                        onChange={(e) => setAnalysisYears(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                </div>

                <div className="sm:col-span-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                    <h4 className="font-medium mb-2">Summary of RAMP Program</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                        <li>Current annual cost: ${contractValue}M</li>
                        <li>Reduced annual cost after RAMP: ${reducedCost.toFixed(2)}M ({reducedCostPercent.toFixed(1)}%)</li>
                        <li>Annual savings: ${annualSavings.toFixed(2)}M</li>
                        <li>Team incentive payouts after rebuild:
                            <ul className="list-disc pl-5 mt-1">
                                <li>Year 1: ${(annualSavings * 0.5).toFixed(2)}M (50% of savings)</li>
                                <li>Year 2: ${(annualSavings * 0.25).toFixed(2)}M (25% of savings)</li>
                                <li>Year 3: ${(annualSavings * 0.125).toFixed(2)}M (12.5% of savings)</li>
                            </ul>
                        </li>
                    </ul>
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
                                {Array.from({ length: analysisYears }).map((_, idx) => (
                                    <th key={idx} className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Year {idx + 1} {idx < rebuildTime ? "(Rebuild)" : ""}
                                    </th>
                                ))}
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            <tr>
                                <td className="px-3 py-2 text-sm font-medium">Current Cost</td>
                                {calculatedValues.existing.map((val, idx) => (
                                    <td key={idx} className="px-3 py-2 text-sm">${val.toFixed(2)}M</td>
                                ))}
                                <td className="px-3 py-2 text-sm font-semibold">${calculatedValues.totals.existing.toFixed(2)}M</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 text-sm font-medium">RAMP Cost</td>
                                {calculatedValues.ramp.map((val, idx) => (
                                    <td key={idx} className="px-3 py-2 text-sm">
                                        ${val.toFixed(2)}M
                                        {calculatedValues.payouts[idx] > 0 && (
                                            <span className="block text-xs text-gray-500 dark:text-gray-400">
                                                (incl. ${calculatedValues.payouts[idx].toFixed(2)}M payout)
                                            </span>
                                        )}
                                    </td>
                                ))}
                                <td className="px-3 py-2 text-sm font-semibold">${calculatedValues.totals.ramp.toFixed(2)}M</td>
                            </tr>
                            <tr>
                                <td className="px-3 py-2 text-sm font-medium">Net Savings</td>
                                {calculatedValues.savings.map((val, idx) => (
                                    <td key={idx} className={`px-3 py-2 text-sm ${val >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                        ${val.toFixed(2)}M
                                    </td>
                                ))}
                                <td className={`px-3 py-2 text-sm font-semibold ${calculatedValues.totals.savings >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                    ${calculatedValues.totals.savings.toFixed(2)}M
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 