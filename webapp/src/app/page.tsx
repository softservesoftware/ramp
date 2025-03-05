'use client';


import { Section } from "@/components/Section";
import { SpendingChart } from "@/components/SpendingChart";
import { CostCalculator } from "@/components/CostCalculator";
import { Timeline } from "@/components/Timeline";
import { Analytics } from "@vercel/analytics/react"
// NAICS 5415 spending data with projections (9.22% CAGR)
const spendingData = [
  { year: '2019', amount: 43.47, projected: false },
  { year: '2020', amount: 57.33, projected: false },
  { year: '2021', amount: 61.36, projected: false },
  { year: '2022', amount: 66.13, projected: false },
  { year: '2023', amount: 70.44, projected: false },
  { year: '2024', amount: 73.12, projected: false },
  { year: '2025', amount: 79.86, projected: true },
  { year: '2026', amount: 87.23, projected: true },
  { year: '2027', amount: 95.27, projected: true },
  { year: '2028', amount: 104.06, projected: true },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-4 py-6 md:p-8 gap-6 md:gap-8">
      <header className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Rapid Application Modernization Program (RAMP)</h1>
      </header>

      <main className="flex-1 flex flex-col gap-6 md:gap-8 max-w-4xl mx-auto w-full">
        <Section title="Problem Overview">
          <p className="mb-3">
            The US government currently spends <strong>$73B annually</strong> on Computer Systems Design and Related Services (NAICS 5415).
            This spending has grown at a <strong>9.22% CAGR</strong> between 2019 and 2024, and is projected to reach <strong>$104B by 2028</strong> if current trends continue.
          </p>

          <SpendingChart data={spendingData} />

          <p className="mb-3">
            We estimate that <strong>15%</strong> of this annual spend—approximately <strong>$11B</strong>—is allocated to basic web development for relatively simple
            database-driven websites built on legacy technologies. These systems are expensive to maintain due to outdated infrastructure and accumulated technical debt.
            The RAMP framework can deliver equivalent or superior functionality for just <strong>$1-2B annually</strong>, representing potential savings of up to 80%.
          </p>
        </Section>

        <Section title="RAMP Solution Overview">
          <p className="mb-3">
            The Rapid Application Modernization Program (RAMP) rebuilds legacy web applications using cutting-edge technologies,
            elite talent, and modern methodologies. Our approach delivers completely modernized systems within <strong>3-4 months</strong> at
            <strong> zero net cost to the government</strong> through our <strong>performance-based compensation model</strong>.
          </p>

          <p className="mb-3">
            RAMP is designed to attract world-class talent by offering exceptional short-term compensation tied directly to rapid delivery and cost reduction.
            This solution was developed by experienced technologists with deep understanding of the unique challenges in government software development.
          </p>
        </Section>

        <Section title="RAMP Cost Model">
          <p className="mb-3">
            Our solution operates at <strong>zero or negative net cost</strong> to government agencies. Our compensation is <strong>100% performance-based</strong>,
            tied directly to verified cost savings and delivery timelines. We receive <strong>50% of realized annual cost savings in year 1,
              25% in year 2, and 12.5% in year 3</strong>, with no charges thereafter.
          </p>

          <CostCalculator />

          <p className="mb-3">
            Most RAMP projects are completed within the same fiscal year, enabling <strong>immediate budget relief</strong>.
            With <strong>no upfront investment</strong> and strictly performance-based compensation, agencies assume <strong>no financial risk</strong>—we
            succeed only when we deliver measurable savings.
          </p>
        </Section>

        <Section title="RAMP Timeline">
          <p className="mb-3">
            The program follows a streamlined <strong>3-4 month timeline</strong> divided into three distinct phases:
          </p>
          <Timeline />
        </Section>

        <Section title="RAMP Personnel Innovation">
          <p className="mb-3">
            RAMP operates with <strong>small teams of exceptional engineers</strong> rather than the large teams typically deployed for government IT projects.
            These elite technologists can deliver in weeks what conventionally takes months or years.
          </p>

          <p className="mb-3">
            Our engineers receive <strong>premium compensation</strong> compared to industry standards
            in exchange for their demonstrated ability to deliver extraordinary results quickly. This performance-based model
            attracts world-class talent committed to rapid, high-quality outcomes.
          </p>

          <p className="mb-3">
            Once development is complete, we <strong>transition the modernized systems</strong> with comprehensive
            documentation and best practices to a <strong>standard-rate workforce</strong> for long-term maintenance.
            This approach ensures both rapid development and sustainable operations while maximizing cost savings.
          </p>
        </Section>

        <Section title="RAMP Technical Innovation">
          <p className="mb-3">
            RAMP leverages a modern technology stack with <strong>reusable application templates</strong> to dramatically accelerate development.
            Our approach is built on a <a href="https://github.com/softservesoftware/nextjs-starter" className="text-blue-600 hover:underline">purpose-built NextJS foundation</a> that enables
            rapid deployment across any environment—cloud, on-premises, or across classification levels.
          </p>

          <p className="mb-3">
            Our technical stack includes <strong>NextJS</strong> for flexible web applications, <strong>TailwindCSS and ShadCN</strong> for
            consistent UI components, <strong>Prisma ORM</strong> for database abstraction, and <strong>Docker</strong> for containerization.
            This engineered balance of <strong>simplicity and scalability</strong> minimizes infrastructure costs while maintaining performance.
          </p>

          <p className="mb-3">
            The platform includes <strong>pre-configured authentication systems</strong> that integrate seamlessly with federal SSO solutions.
            By standardizing these patterns, we reduce development time while maintaining high security standards and
            compliance with government requirements.
          </p>

          <p className="mb-3">
            This standardized stack facilitates smooth transition to maintenance teams and supports ongoing enhancement.
            The architecture also leverages modern <strong> AI-assisted development capabilities, enabling rapid iteration and evolution
              of features as requirements change. </strong>
          </p>
        </Section>

        <Section title="Next Steps For RAMP">
          <p className="mb-3">
            To achieve rapid results, RAMP needs integration with established federal procurement mechanisms.
            Likely, the <strong>most efficient implementation path</strong> would be to accept this solution as part of a
            <strong> SBIR research grant program.</strong> With a SBIR award for innovative pricing and technical strategies,
            RAMP can begin delivering cost savings across federal agencies quickly.
          </p>

          <p className="mb-3">
            <strong>Contact Information:</strong><br />
            Email: <a href="mailto:matt@softservsoftware.com" className="text-blue-600 hover:underline">matt@softservsoftware.com</a><br />
            Phone: <a href="tel:6107315229" className="text-blue-600 hover:underline">(610) 731-5229</a>
          </p>
        </Section>
      </main>

      <footer className="mt-6 text-center">
        <p className="text-sm text-gray-500">© 2025 Softserve Software LLC. All rights reserved.</p>
        <p className="text-sm text-gray-500">The Rapid Application Modernization Program (RAMP) was announced by Softserve Software LLC on March 1, 2025.</p>
      </footer>
      <Analytics />
    </div>
  );
}
