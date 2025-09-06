// app/campaigns/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Dynamically import tab components (only when needed).
// Overview is implemented in a separate file (see file #2 below).
const Overview = dynamic(() => import("@/components/campaigns/CampaignOverview"), {
  loading: () => <div className="p-4">Loading overview…</div>,
  ssr: false,
});

// Example placeholders you should create later:
// const Leads = dynamic(() => import('@/components/campaigns/CampaignLeads'), { ssr:false, loading: () => <div>Loading leads…</div> });
// const Sequence = dynamic(() => import('@/components/campaigns/CampaignSequence'), { ssr:false, loading: () => <div>Loading sequence…</div> });

type Campaign = {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Draft";
  totalLeads: number;
  requestSent: number;
  requestAccepted: number;
  requestReplied: number;
  startDate?: string;
  conversionRate?: number;
  progress: {
    contactedPercent: number;
    acceptancePercent: number;
    replyPercent: number;
  };
  description?: string;
};

const mockCampaign = (id?: string): Campaign => ({
  id: id ?? "1",
  name: "Just Herbs",
  status: "Active",
  totalLeads: 20,
  requestSent: 0,
  requestAccepted: 0,
  requestReplied: 0,
  startDate: "2025-02-09",
  conversionRate: 0,
  progress: { contactedPercent: 0, acceptancePercent: 0, replyPercent: 0 },
  description: "This campaign targets herb enthusiasts across channels.",
});

export default function CampaignPage() {
  const params = useParams();
  const id = (params as any)?.id as string | undefined;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "sequence" | "settings">("overview");

  useEffect(() => {
    let mounted = true;
    async function fetchCampaign() {
      setLoading(true);
      try {
        if (!id) throw new Error("No id");
        const res = await fetch(`/api/campaigns/${id}`);
        if (!res.ok) throw new Error("API fail");
        const data = await res.json();
        if (mounted) setCampaign(data);
      } catch (err) {
        // fallback to mock so layout still renders
        if (mounted) setCampaign(mockCampaign(id));
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchCampaign();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading || !campaign) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-slate-200 rounded" />
          <div className="h-4 w-1/4 bg-slate-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold">{campaign.name}</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and track your campaign performance</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="rounded-md px-3 py-1 text-sm">{campaign.status}</Badge>
          <Button variant="ghost" className="hidden md:inline-flex">Edit</Button>
          <Button>
            <span className="hidden md:inline">Actions</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Tabs (controller only) */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Conditionally render only the selected tab's component */}
      <div>
        {activeTab === "overview" && <Overview campaign={campaign} />}
        {activeTab === "leads" && (
          <div className="p-4 bg-white rounded-lg shadow">
            {/* Placeholder: create `components/campaigns/CampaignLeads.tsx` and dynamic import it above */}
            <div className="text-slate-500">Leads component will render here. (Create and import it dynamically.)</div>
          </div>
        )}
        {activeTab === "sequence" && (
          <div className="p-4 bg-white rounded-lg shadow">
            {/* Placeholder: create `components/campaigns/CampaignSequence.tsx` and dynamic import it above */}
            <div className="text-slate-500">Sequence editor will render here. (Create and import it dynamically.)</div>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="text-slate-500">Settings UI — add forms or controls here.</div>
          </div>
        )}
      </div>
    </div>
  );
}
