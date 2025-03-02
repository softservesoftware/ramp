import React from 'react';
export function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-3">{title}</h2>
            {children}
        </section>
    );
} 