'use client';


import { Section } from "@/components/Section";
import { SpendingChart } from "@/components/SpendingChart";
import { CostCalculator } from "@/components/CostCalculator";
import { Timeline } from "@/components/Timeline";

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
            Currently, the US government spends <strong>$73B annually</strong> on NAICS 5415 (Computer Systems Design and Related Services).
            Between 2019 and 2024, this spending has grown at a <strong>9.22% CAGR</strong>. If left unchecked, it will reach approximately <strong>$100B by 2028</strong>.
          </p>

          <SpendingChart data={spendingData} />

          <p className="mb-3">
            We estimate that about <strong>15%</strong> of this annual spend goes toward basic web development for relatively simple
            database-driven websites. These systems use legacy technologies that are expensive to maintain due to infrastructure and complexity due to technical debt.
            If correct, this represents approximately <strong>$11B in annual spending</strong> on legacy technology maintenance.
          </p>
        </Section>

        <Section title="RAMP Solution Overview">
          <p className="mb-3">
            The Rapid Application Modernization Program (RAMP) rebuilds legacy web applications using the latest and greatest technologies,
            talent, and methodologies. <strong>RAMP rebuilds outdated systems</strong> within <strong>3-4 months</strong> at <strong>no net cost to the government</strong> through
            a <strong>100% performance-based model</strong>. We can deliver equivalent or better functionality while <strong>reducing costs by up to 80%</strong>. RAMP is
            designed to <strong>attract and retain the best talent in the world</strong> by offering <strong>outsized/asymmetric short term compensation</strong> in exchange
            for <strong>rapid delivery at scale</strong>. This solution was developed by a team of technologists with a deep understanding of challenges associated with government software development.
          </p>
        </Section>

        <Section title="RAMP Cost Model">
          <p className="mb-3">
            This solution is offered at <strong>zero or negative net cost</strong> to the government. Compensation is <strong>100% performance-based</strong>,
            tied directly to cost savings and delivery timeline. We charge <strong>50% of realized annual cost savings in year 1,
              25% in year 2, and 12.5% in year 3</strong>, with no charges thereafter.
          </p>

          <CostCalculator />

          <p className="mb-3">
            In most cases, the RAMP program can be completed within the same fiscal year, allowing <strong>immediate cost savings</strong>.
            With <strong>$0 upfront cost</strong> and strictly performance-based compensation, the government assumes <strong>no risk</strong>—we succeed only
            when the government saves money and we deliver on our promises.
          </p>
        </Section>

        <Section title="RAMP Timeline">
          <p className="mb-3">
            The program follows a <strong>3-4 month timeline</strong> divided into <strong>three phases</strong>:
          </p>
          <Timeline />
        </Section>

        <Section title="RAMP Personnel Innovation">
          <p className="mb-3">
            RAMP operates with <strong>small teams of 10x engineers</strong> instead of the large teams traditionally deployed for government IT projects.
            These elite technologists can deliver in weeks what normally takes months or years with conventional teams.
          </p>

          <p className="mb-3">
            Our engineers receive <strong>significantly higher compensation</strong> than industry standards
            in exchange for their <strong>outsized delivery capabilities</strong>. This performance-based compensation model
            attracts world-class talent motivated to deliver extraordinary results quickly.
          </p>

          <p className="mb-3">
            Once development is complete, we <strong>transition the modernized systems</strong> along with comprehensive
            documentation, best practices, and guidelines to a <strong>lower-rate workforce</strong> for long-term maintenance
            and incremental feature additions. This approach ensures both rapid development and sustainable operations
            while maximizing cost savings.
          </p>
        </Section>

        <Section title="RAMP Technical Innovation">
          <p className="mb-3">
            RAMP leverages a modern technology stack with <strong>reusable application templates</strong> to dramatically accelerate development.
            Our approach is built on a <a href="https://github.com/softservesoftware/nextjs-starter" className="text-blue-600 hover:underline">purpose-built NextJS foundation</a> that enables
            rapid deployment across any environment—cloud, on-premises, or across classification levels.
          </p>

          <p className="mb-3">
            Our technical stack includes <strong>NextJS</strong> for frontend and API development, <strong>TailwindCSS and ShadCN</strong> for
            consistent UI components, <strong>Prisma ORM</strong> for database abstraction, and <strong>Docker</strong> for containerization.
            This carefully engineered balance of <strong>simplicity and scalability</strong> minimizes infrastructure costs and complexity.
          </p>

          <p className="mb-3">
            The platform comes with <strong>pre-configured authentication mechanisms</strong> that integrate seamlessly with federal SSO systems.
            By standardizing on these patterns, we reduce development time while maintaining high security standards and
            compliance with government requirements.
          </p>

          <p className="mb-3">
            After hand off this stack will be easily transitioned to a lower rate workforce that can continue to iterate and improve the system. 
            Standardized patterns and best practices will be provided to ensure a smooth transition and ongoing maintenance.
          </p>
        </Section>

        <Section title="What RAMP Needs to Get Started">
          <p className="mb-3">
            To achieve fast results, the RAMP process needs to be incorporated into a mechanism that the federal government can purchase.
            I believe that the <strong>fastest way to implement this solution</strong> is to accept this submission as comparable to
            <strong> SBIR Phase I research</strong> and <strong>sole source a SBIR Phase II to Softserve Software LLC.</strong>
            With a Phase II award, we can begin the RAMP process across the federal government immediately. There may be other channels
            to quickly implement this solution, but this is the fastest path to results that we are aware of.
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
        <p className="text-sm text-gray-500"> The Rapid Application Modernization Program (RAMP) was announced by Softserve Software LLC on March 1, 2025.</p>
      </footer>
    </div>
  );
}
