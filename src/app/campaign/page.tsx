
"use client";

import React, { use, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CampaignsTable from "@/components/CampaignsTable";
import useCampaignStore, { Campaign } from "@/store/useCampaignStore";
import { useRouter } from "next/navigation";
import useSidebarStore from "@/store/useSidebar";
import { makeCampaigns } from "@/util/makeCampaign";



 const CampaignsPage:React.FC = () =>  {
 
  const campaigns = useCampaignStore((s) => s.campaigns);
  const loading = useCampaignStore((s) => s.loading);
  const query = useCampaignStore((s) => s.query);
  const statusFilter = useCampaignStore((s) => s.statusFilter);
  const page = useCampaignStore((s) => s.page);
  const pageSize = useCampaignStore((s) => s.pageSize);
  const collapsed = useSidebarStore((s) => s.collapsed);
const selectedCampaignId = useCampaignStore((s) => s.selectedCampaignId);

  // actions
  const setCampaigns = useCampaignStore((s) => s.setCampaigns);
  const appendCampaigns = useCampaignStore((s) => s.appendCampaigns);
  const setQuery = useCampaignStore((s) => s.setQuery);
  const setStatusFilter = useCampaignStore((s) => s.setStatusFilter);
  const setPage = useCampaignStore((s) => s.setPage);
  const setLoading = useCampaignStore((s) => s.setLoading);
  const openCampaign = useCampaignStore((s) => s.openCampaign);
  const setSelectedCampaignId = useCampaignStore((s) => s.setSelectedCampaignId);
  const router= useRouter();
  // const makeCampaign=makeCampaigns();


  useEffect(() => {
    setLoading(true);
    // const data = makeCampaigns(60);/
    // simulate network
    setTimeout(() => {
      setCampaigns(makeCampaigns());
      setLoading(false);
    }, 200);
  }, [setCampaigns, setLoading]);

  useEffect(() => {
   
    console.log('selectedCampaignId changed', selectedCampaignId);
  }, [selectedCampaignId]);

  
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return campaigns.filter((c) => {
      const matchesQ = !q || c.name.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || c.status === statusFilter;
      return matchesQ && matchesStatus;
    });
  }, [campaigns, query, statusFilter]);

  const visible = useMemo(() => filtered.slice(0, page * pageSize), [filtered, page, pageSize]);


  const handleRowClick = (id: string) => {
   
    router.push(`/campaign/${id}`);
    
    setSelectedCampaignId(id);
    openCampaign(id);
console.log('selectedCampaignId', selectedCampaignId)
  };

  return (
    <div className={`${collapsed?"max-w-7xl mx-auto":"max-w-[75%] relative left-[20%]"} md:p-6 p-3`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-sm text-slate-500">Manage your campaigns and track their performance.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={() => { /* create campaign */ }} className="bg-blue-600 text-white">Create Campaign</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-slate-100 p-1 flex">
            <button className={`px-3 py-1 rounded-md ${statusFilter === "" ? "bg-white shadow-sm" : "text-slate-600"}`} onClick={() => setStatusFilter("")}>All Campaigns</button>
            <button className={`px-3 py-1 rounded-md ${statusFilter === "Active" ? "bg-white shadow-sm" : "text-slate-600"}`} onClick={() => setStatusFilter("Active")}>Active</button>
            <button className={`px-3 py-1 rounded-md ${statusFilter === "Inactive" ? "bg-white shadow-sm" : "text-slate-600"}`} onClick={() => setStatusFilter("Inactive")}>Inactive</button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search campaigns..." className="w-64" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <CampaignsTable
          campaigns={visible}
          isLoading={loading}
          onRowClick={handleRowClick}
        />

        {visible.length < filtered.length && (
          <div className="p-4 text-center">
            <Button onClick={() => setPage(page + 1)} variant="outline">Load more</Button>
          </div>
        )}

        {filtered.length === 0 && !loading && <div className="p-6 text-center text-slate-500">No campaigns found</div>}
      </div>
    </div>
  );
}

export default CampaignsPage;