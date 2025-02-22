import { GithubIssuesTable } from "@/components/GithubIssuesTable";
import SectionHeader from "@/components/SectionHeader";

export default function Home() {
  return (
    <section className="w-full px-5 lg:px-40">
      <div className="bg-grid-black/[0.1] dark:bg-grid-white/[0.1] dark:bg-background relative flex w-full items-start justify-center bg-white">
        <div className="dark:bg-background pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative z-20 px-5 py-10 lg:px-40">
          <SectionHeader
            title="Redot Proposal Viewer"
            description="Welcome to the Redot Proposal Viewer. Here, you can browse and review proposals for the Redot engine."
          />
        </div>
      </div>
      <GithubIssuesTable />
    </section>
  );
}
