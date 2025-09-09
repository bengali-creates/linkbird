// src/store/useCampaignStore.ts
import {create} from "zustand";
import { devtools } from "zustand/middleware";

export type Campaign = {
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

type CampaignStore = {
  campaigns: Campaign[];            // full loaded list (or current page)
  selectedCampaignId: string | null;
  selectedCampaign: Campaign | null;
  query: string;
  statusFilter: "" | Campaign["status"];
  page: number;
  pageSize: number;
  loading: boolean;

  // actions
  setCampaigns: (c: Campaign[]) => void;
  appendCampaigns: (c: Campaign[]) => void;
  setSelectedCampaignId: (id: string | null) => void;
  setSelectedCampaign: (c: Campaign | null) => void;
  openCampaign: (id: string) => void;
  closeCampaign: () => void;

  setQuery: (q: string) => void;
  setStatusFilter: (s: "" | Campaign["status"]) => void;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
  setLoading: (v: boolean) => void;

  // helper high-level actions
  resetFilters: () => void;
};

export const useCampaignStore = create<CampaignStore>()(
  devtools((set) => ({
    campaigns: [],
    selectedCampaignId: null,
    selectedCampaign: null,
    query: "",
    statusFilter: "",
    page: 1,
    pageSize: 12,
    loading: false,

    setCampaigns: (c) => set({ campaigns: c }),
    appendCampaigns: (c) => set((s) => ({ campaigns: [...s.campaigns, ...c] })),

    setSelectedCampaignId: (id) => set({ selectedCampaignId: id }),
    openCampaign: (id) => set({ selectedCampaignId: id }),
    closeCampaign: () => set({ selectedCampaignId: null }),

    setQuery: (q) => set({ query: q, page: 1 }), // reset page when searching
    setStatusFilter: (s) => set({ statusFilter: s, page: 1 }),
    setPage: (p) => set({ page: p }),
    setPageSize: (s) => set({ pageSize: s }),
    setLoading: (v) => set({ loading: v }),

    resetFilters: () => set({ query: "", statusFilter: "", page: 1 }),
  }))
);

export default useCampaignStore;
