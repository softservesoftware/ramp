import { useState, useEffect } from "react";
import React from 'react';

export function CostCalculator() {
    // Core inputs
    const [contractValue, setContractValue] = useState(25); // Original annual cost ($M)
    const [reducedCost, setReducedCost] = useState(10); // Default to 10M (10% of original cost)
    const [rebuildTime, setRebuildTime] = useState(12); // Months to rebuild (default 12 months = 1 year)
    const [analysisMonths, setAnalysisMonths] = useState(60); // Total months to analyze (default 60 months = 5 years)
    
    // Track if user has manually edited the contract period (for UX purposes)
    const [userEditedPeriod, setUserEditedPeriod] = useState(false);

    // Update reducedCost when contractValue changes to maintain the 10% default relationship
    useEffect(() => {
        setReducedCost(contractValue * 0.1);
    }, [contractValue]);

    // Derived values - converted to monthly
    const monthlyContractValue = contractValue / 12;
    const monthlyReducedCost = reducedCost / 12;
    const monthlySavings = monthlyContractValue - monthlyReducedCost;
    const annualSavings = monthlySavings * 12;
    
    // Minimum required contract period
    const minAnalysisMonths = rebuildTime + 36;
    
    // Calculate results for each month
    const [calculatedValues, setCalculatedValues] = useState<{
        existing: number[];
        ramp: number[];
        savings: number[];
        totals: { existing: number; ramp: number; savings: number };
        payouts: number[];
        yearlyData: {
            existing: number[];
            ramp: number[];
            savings: number[];
            year: string[];
            hasRebuild: boolean[];
        };
    }>({
        existing: [],
        ramp: [],
        savings: [],
        payouts: [],
        totals: { existing: 0, ramp: 0, savings: 0 },
        yearlyData: { existing: [], ramp: [], savings: [], year: [], hasRebuild: [] }
    });

    // Update contract period when rebuild time changes (only if not manually edited)
    useEffect(() => {
        if (!userEditedPeriod) {
            setAnalysisMonths(Math.max(analysisMonths, rebuildTime + 36));
        }
    }, [rebuildTime, userEditedPeriod, analysisMonths]);

    useEffect(() => {
        // Ensure we have sufficient analysis period
        if (analysisMonths < minAnalysisMonths) {
            return; // Don't calculate if invalid period
        }
        
        // Create arrays for the timeline
        const existing = Array(analysisMonths).fill(monthlyContractValue);
        const ramp = Array(analysisMonths).fill(0);
        const payouts = Array(analysisMonths).fill(0);
        const savings = Array(analysisMonths).fill(0);
        
        // During rebuild months, RAMP cost is $0 (government still pays original cost)
        // No savings during rebuild phase
        for (let i = 0; i < rebuildTime; i++) {
            ramp[i] = 0; // RAMP costs are $0 during rebuild
            payouts[i] = 0;
            savings[i] = 0; // No savings during rebuild
        }
        
        // After rebuild, costs are the reduced amount plus team incentives
        for (let i = rebuildTime; i < analysisMonths; i++) {
            // Base RAMP cost is the reduced monthly cost
            ramp[i] = monthlyReducedCost;
            
            // Calculate incentive payouts for first 36 months after rebuild
            const monthsAfterRebuild = i - rebuildTime;
            if (monthsAfterRebuild < 12) {
                payouts[i] = monthlySavings * 0.5; // 50% of savings in first year
            } else if (monthsAfterRebuild < 24) {
                payouts[i] = monthlySavings * 0.25; // 25% in second year
            } else if (monthsAfterRebuild < 36) {
                payouts[i] = monthlySavings * 0.125; // 12.5% in third year
            }
            
            // Total RAMP cost = base cost + incentive payouts
            ramp[i] += payouts[i];
            
            // Net savings = original cost - total RAMP cost
            savings[i] = existing[i] - ramp[i];
        }
        
        // Calculate totals
        const totals = {
            existing: existing.reduce((sum, val) => sum + val, 0),
            ramp: ramp.reduce((sum, val) => sum + val, 0),
            savings: savings.reduce((sum, val) => sum + val, 0)
        };
        
        // Group data by years, incorporating rebuild period into years
        const yearlyData: {
            existing: number[];
            ramp: number[];
            savings: number[];
            year: string[];
            hasRebuild: boolean[];
        } = {
            existing: [],
            ramp: [],
            savings: [],
            year: [],
            hasRebuild: []
        };
        
        // Calculate full years in the analysis period
        const fullYears = Math.ceil(analysisMonths / 12);
        
        for (let year = 0; year < fullYears; year++) {
            const startMonth = year * 12;
            const endMonth = Math.min(startMonth + 12, analysisMonths);
            const monthsInYear = endMonth - startMonth;
            
            // Check if this year contains any rebuild months
            const yearStartRebuildMonths = Math.max(0, Math.min(rebuildTime - startMonth, monthsInYear));
            const hasRebuild = yearStartRebuildMonths > 0;
            
            // Create year label
            let yearLabel = `Year ${year + 1}`;
            if (monthsInYear < 12) {
                yearLabel += ` (${monthsInYear} months)`;
            }
            if (hasRebuild) {
                yearLabel += ` - includes ${yearStartRebuildMonths} rebuild month${yearStartRebuildMonths > 1 ? 's' : ''}`;
            }
            
            yearlyData.year.push(yearLabel);
            yearlyData.hasRebuild.push(hasRebuild);
            
            // Sum the values for this year
            yearlyData.existing.push(
                existing.slice(startMonth, endMonth).reduce((sum, val) => sum + val, 0)
            );
            yearlyData.ramp.push(
                ramp.slice(startMonth, endMonth).reduce((sum, val) => sum + val, 0)
            );
            yearlyData.savings.push(
                savings.slice(startMonth, endMonth).reduce((sum, val) => sum + val, 0)
            );
        }
        
        setCalculatedValues({ existing, ramp, savings, payouts, totals, yearlyData });
    }, [contractValue, reducedCost, rebuildTime, analysisMonths, monthlyContractValue, monthlyReducedCost, monthlySavings, minAnalysisMonths]);

    // Calculate the percentage for display purposes
    const reducedCostPercent = contractValue > 0 ? (reducedCost / contractValue) * 100 : 0;

    // Annual incentive values
    const year1Incentive = monthlySavings * 0.5 * 12;
    const year2Incentive = monthlySavings * 0.25 * 12;
    const year3Incentive = monthlySavings * 0.125 * 12;
    
    // Calculate total incentives paid
    const totalIncentives = year1Incentive + year2Incentive + year3Incentive;
    
    // Calculate percentage of savings from total contract value
    const savingsPercentage = calculatedValues.totals.existing > 0 
        ? ((calculatedValues.totals.savings / calculatedValues.totals.existing) * 100).toFixed(1) 
        : "0";

    return (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-sm my-4">
            <h2 className="text-2xl font-bold text-center mb-6">RAMP Cost Savings Calculator</h2>
            
            {/* Key Metrics Summary - Prominent display of key results */}
            {/* {calculatedValues.totals.savings > 0 && (
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-xl mb-8 text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        ${calculatedValues.totals.savings.toFixed(2)}M Total Savings
                    </div>
                    <div className="text-lg text-green-700 dark:text-green-300">
                        {savingsPercentage}% saved over {Math.floor(analysisMonths/12)} years {analysisMonths % 12 > 0 ? `and ${analysisMonths % 12} months` : ''}
                    </div>
                </div>
            )} */}
            
            {/* Input Section with a clean layout */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">Program Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Current Annual Cost ($M)
                        </label>
                        <input
                            type="number"
                            min="1"
                            value={contractValue}
                            onChange={(e) => setContractValue(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Reduced Annual Cost after RAMP ($M)
                        </label>
                        <input
                            type="number"
                            min="0"
                            max={contractValue}
                            value={reducedCost}
                            onChange={(e) => setReducedCost(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        />
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {reducedCostPercent.toFixed(1)}% of original cost
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Rebuild Time (months)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            value={rebuildTime}
                            onChange={(e) => setRebuildTime(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Analysis Period (months)
                        </label>
                        <input
                            type="number"
                            min={minAnalysisMonths}
                            max="180"
                            value={analysisMonths}
                            onChange={(e) => {
                                setUserEditedPeriod(true);
                                setAnalysisMonths(Number(e.target.value));
                            }}
                            className={`w-full px-3 py-2 border ${
                                analysisMonths < minAnalysisMonths 
                                ? "border-red-500" 
                                : "border-gray-300 dark:border-gray-600"
                            } rounded-md bg-white dark:bg-gray-800`}
                        />
                        {analysisMonths < minAnalysisMonths && (
                            <div className="mt-1 text-xs text-red-500">
                                Must include rebuild time ({rebuildTime} months) plus 36 months for incentives.
                            </div>
                        )}
                        {!userEditedPeriod && (
                            <div className="mt-1 text-xs text-gray-500">
                                Auto-adjusted to minimum required period
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Highlighted Cost Comparison */}
            {/* <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">Annual Cost Comparison</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Current Annual Cost</div>
                        <div className="text-2xl font-bold">${contractValue}M</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">${(contractValue/12).toFixed(2)}M per month</div>
                    </div>
                    
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-green-500">
                        <div className="text-sm text-gray-600 dark:text-gray-400">RAMP Annual Cost</div>
                        <div className="text-2xl font-bold">${reducedCost.toFixed(2)}M</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">${(reducedCost/12).toFixed(2)}M per month</div>
                    </div>
                    
                    <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border-l-4 border-green-600">
                        <div className="text-sm text-green-600 dark:text-green-400">Annual Savings</div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">${annualSavings.toFixed(2)}M</div>
                        <div className="text-sm text-green-600 dark:text-green-400">${monthlySavings.toFixed(2)}M per month</div>
                    </div>
                </div>
            </div> */}
            
            {/* Highlighted Incentive Structure */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">Team Incentive Structure</h3>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg mb-4">
                    <div className="text-center mb-3">
                        <div className="text-lg font-medium text-purple-700 dark:text-purple-300">Total Incentives</div>
                        <div className="text-3xl font-bold text-purple-700 dark:text-purple-300">${totalIncentives.toFixed(2)}M</div>
                        <div className="text-sm text-purple-600 dark:text-purple-400">over 3 years after rebuild</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-purple-700 dark:text-purple-300 font-medium">Year 1</div>
                                <div className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">50% of savings</div>
                            </div>
                            <div className="text-2xl font-bold">${year1Incentive.toFixed(2)}M</div>
                            <div className="text-xs text-gray-500">${(year1Incentive/12).toFixed(2)}M per month</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-purple-700 dark:text-purple-300 font-medium">Year 2</div>
                                <div className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">25% of savings</div>
                            </div>
                            <div className="text-2xl font-bold">${year2Incentive.toFixed(2)}M</div>
                            <div className="text-xs text-gray-500">${(year2Incentive/12).toFixed(2)}M per month</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <div className="text-purple-700 dark:text-purple-300 font-medium">Year 3</div>
                                <div className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full">12.5% of savings</div>
                            </div>
                            <div className="text-2xl font-bold">${year3Incentive.toFixed(2)}M</div>
                            <div className="text-xs text-gray-500">${(year3Incentive/12).toFixed(2)}M per month</div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Timeline Breakdown */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">Cost Timeline Breakdown</h3>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Period
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Current Costs
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    RAMP Costs
                                </th>
                                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Net Savings
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {calculatedValues.yearlyData.year.map((period, idx) => (
                                <tr key={idx} className={calculatedValues.yearlyData.hasRebuild[idx] ? "bg-gray-100 dark:bg-gray-800/50" : ""}>
                                    <td className="px-3 py-2 text-sm font-medium">{period}</td>
                                    <td className="px-3 py-2 text-sm">${calculatedValues.yearlyData.existing[idx].toFixed(2)}M</td>
                                    <td className="px-3 py-2 text-sm">${calculatedValues.yearlyData.ramp[idx].toFixed(2)}M</td>
                                    <td className={`px-3 py-2 text-sm font-medium ${calculatedValues.yearlyData.savings[idx] >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                        ${calculatedValues.yearlyData.savings[idx].toFixed(2)}M
                                    </td>
                                </tr>
                            ))}
                            <tr className="bg-gray-100 dark:bg-gray-800 font-bold">
                                <td className="px-3 py-2 text-sm">Total</td>
                                <td className="px-3 py-2 text-sm">${calculatedValues.totals.existing.toFixed(2)}M</td>
                                <td className="px-3 py-2 text-sm">${calculatedValues.totals.ramp.toFixed(2)}M</td>
                                <td className={`px-3 py-2 text-sm ${calculatedValues.totals.savings >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                                    ${calculatedValues.totals.savings.toFixed(2)}M
                                    {calculatedValues.totals.existing > 0 && (
                                        <span className="ml-1">
                                            ({savingsPercentage}%)
                                        </span>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Key Notes */}
            <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Key Points:</h4>
                <ul className="list-disc pl-5 space-y-1">
                    <li>During the {rebuildTime}-month rebuild period, the government continues to pay existing contract costs.</li>
                    <li>After rebuild, total RAMP costs = reduced base cost + incentive payments.</li>
                    <li>Team incentives are paid as a percentage of realized savings: 50% (Year 1), 25% (Year 2), 12.5% (Year 3).</li>
                    <li>Total projected savings: ${calculatedValues.totals.savings.toFixed(2)}M ({savingsPercentage}%) over the {analysisMonths}-month analysis period.</li>
                </ul>
            </div>
        </div>
    );
} 