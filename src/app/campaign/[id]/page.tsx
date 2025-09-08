
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import useSidebarStore from "@/store/useSidebar";
import useCampaignStore from "@/store/useCampaignStore";
import { Campaign } from "@/store/useCampaignStore";

const Overview = dynamic(() => import("@/components/campaigns/CampaignOverview"), {
  loading: () => <div className="p-4">Loading overview…</div>,
  ssr: false,
});


const Leads = dynamic(() => import('@/components/campaigns/CampaignLeads'), { ssr:false, loading: () => <div>Loading leads…</div> });
const Sequence = dynamic(() => import('@/components/campaigns/CampaignSequence'), { ssr:false, loading: () => <div>Loading sequence…</div> });
const CampaignSettings = dynamic(() => import("@/components/campaigns/CampaignSettings"), { ssr: false });



export default function CampaignPage() {
  const params = useParams();
  const id = (params as any)?.id as string | undefined;
  const campaigns = useCampaignStore((s) => s.campaigns);
  const selectedCampaignId = useCampaignStore((s) => s.selectedCampaignId);
  const [campaign, setCampaign] = useState<Campaign | null>(campaigns.find((c) => c.id === id) || null);



  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "sequence" | "settings">("overview");
      const collapsed = useSidebarStore((s) => s.collapsed);
  useEffect(() => {
    
    console.log('first', selectedCampaignId)
    
      
      
         
    // if (id) {
    //   const found = campaigns.find((c) => c.id === id) || null;
    //   setCampaign(found);
      
    // }
    
    setTimeout(() => {
      console.log('campaign', campaign)
    }, 1000);
  }, [id]);

 
  
  

  if (!campaign) {
    return (
      <div className={`${collapsed ? "max-w-7xl mx-auto" : "max-w-[75%] relative left-[20%]"}  md:p-6 p-3`}>
        <div className="p-4 text-center text-slate-500">Loading campaign…</div>
      </div>
    );
  }

  return (
    <div className={`${collapsed?"max-w-7xl mx-auto":"max-w-[75%] relative left-[20%]"}  md:p-6 p-3`}>
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
        {activeTab === "leads" && <Leads />}
        {activeTab === "sequence" &&  <Sequence campaign={campaign} />}
        {activeTab === "settings" && <CampaignSettings campaign={campaign} />}

      </div>
    </div>
  );
}
