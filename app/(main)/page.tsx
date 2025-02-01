import { GithubIssuesTable } from "@/components/GithubIssuesTable";

export default function Home() {
  return (
    <section className="w-full px-5 lg:px-40">
      <GithubIssuesTable />
    </section>
  );
}
