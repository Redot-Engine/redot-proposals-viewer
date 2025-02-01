"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { columns } from "@/constants/columns";

export interface Issue {
  number: number;
  title: string;
  created_at: string;
  updated_at: string;
  reactions: {
    total_count: number;
    "+1": number;
    "-1": number;
  };
  comments: number;
  html_url: string;
  labels: string[];
}

interface Label {
  name: string;
  color: string;
}

export function GithubIssuesTable() {
  const [data, setData] = useState<Issue[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>("all");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [issuesResponse, labelsResponse] = await Promise.all([
          axios.get(
            `https://api.github.com/repos/redot-engine/redot-proposals/issues?state=open&per_page=100&page=${currentPage}`
          ),
          axios.get("https://api.github.com/repos/redot-engine/redot-proposals/labels"),
        ]);

        const issuesWithScore = issuesResponse.data.map((issue: any) => ({
          number: issue.number,
          title: issue.title,
          created_at: issue.created_at,
          updated_at: issue.updated_at,
          score: issue.reactions?.total_count || 0,
          reactions: {
            "+1": issue.reactions?.["+1"] || 0,
            "-1": issue.reactions?.["-1"] || 0,
          },
          comments: issue.comments,
          html_url: issue.html_url,
          labels: issue.labels.map((label: any) => label.name),
        }));

        setData(issuesWithScore);
        setLabels(labelsResponse.data);

        const linkHeader = issuesResponse.headers.link;
        if (linkHeader && linkHeader.includes('rel="next"')) {
          setHasNextPage(true);
        } else {
          setHasNextPage(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredData = useMemo(() => {
    return selectedLabel === "all"
      ? data
      : data.filter((issue) => issue.labels.includes(selectedLabel));
  }, [data, selectedLabel]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Filter issues..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="w-full"
        />
        <Select value={selectedLabel} onValueChange={setSelectedLabel}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a label" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Labels</SelectItem>
            {labels.map((label) => (
              <SelectItem key={label.name} value={label.name}>
                {label.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!hasNextPage}
        >
          Next
        </Button>
      </div>
    </>
  );
}
