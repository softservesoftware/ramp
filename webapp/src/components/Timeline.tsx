import React from 'react';

export function Timeline() {
  const phases = [
    {
      number: 1,
      title: "Discovery",
      duration: "1 Month",
      description: "Assess existing legacy web application and current state of systems"
    },
    {
      number: 2,
      title: "Rebuild",
      duration: "1-2 Months",
      description: "Rebuild application using modern technologies, personnel, and processes"
    },
    {
      number: 3,
      title: "Transfer",
      duration: "1 Month",
      description: "Documentation, training, and handover to enable long-term maintenance by lower cost resources"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm my-4 md:my-6">
      {/* Mobile Timeline (vertical) */}
      <div className="md:hidden">
        <div className="space-y-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-blue-200"></div>
          
          {phases.map(phase => (
            <div key={phase.number} className="ml-12 relative">
              <div className="absolute -left-16 top-0 w-8 h-8 rounded-full bg-blue-500 z-10 flex items-center justify-center text-white font-bold">
                {phase.number}
              </div>
              <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">{phase.title}</h3>
                <p className="text-sm my-1">{phase.duration}</p>
                <p className="text-sm">{phase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Timeline (horizontal) */}
      <div className="hidden md:block">
        <div className="relative pb-16">
          {/* Timeline track */}
          <div className="absolute top-8 left-0 right-0 h-2 bg-blue-200 rounded-full"></div>

          {/* Timeline nodes */}
          <div className="grid grid-cols-3 gap-4 relative">
            {phases.map(phase => (
              <div key={phase.number} className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 z-10 flex items-center justify-center text-white font-bold">
                  {phase.number}
                </div>
                <div className="mt-6 w-full">
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm h-full">
                    <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">{phase.title}</h3>
                    <p className="text-sm my-2">{phase.duration}</p>
                    <p className="text-sm">{phase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 