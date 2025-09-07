
"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

import type { Campaign } from "@/store/useCampaignStore";

export default function CampaignsTable({
  campaigns,
  isLoading,
  onRowClick,
}: {
  campaigns: Campaign[];
  isLoading?: boolean;
  onRowClick: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="p-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b last:border-b-0">
            <Skeleton className="h-5 w-64" />
            <Skeleton className="h-4 w-20 ml-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Campaign Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Leads</TableHead>
            <TableHead>Request Status</TableHead>
            <TableHead>Connection Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {campaigns.map((c) => (
            <TableRow
              key={c.id}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => onRowClick(c.id)}
            >
              <TableCell className="font-medium">{c.name}</TableCell>
              <TableCell>
                <Badge
                  variant={c.status === "Active" ? "default" : c.status === "Inactive" ? "destructive" : "secondary"}
                >
                  {c.status}
                </Badge>
              </TableCell>
              <TableCell className="flex justify-center items-center gap-2"><Users size={20}/>{c.totalLeads}</TableCell>
              <TableCell className="text-sm text-slate-500"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
