import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Issue } from "@/components/GithubIssuesTable";
import Link from "next/link";

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const issue = row.original;
      return (
        <Link
          href={issue.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 hover:underline dark:text-blue-500"
        >
          {issue.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const reactions = row.original.reactions;
      const positive = reactions["+1"] || 0;
      const negative = reactions["-1"] || 0;

      return (
        <span className="flex items-center justify-center space-x-2">
          <span className="mr-1 text-green-500">+ {positive}</span>
          <span className="text-red-500">- {negative}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "labels",
    header: "Labels",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-1">
          {row.original.labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-200 dark:text-blue-950"
            >
              {label}
            </span>
          ))}
        </div>
      );
    },
  },
];
