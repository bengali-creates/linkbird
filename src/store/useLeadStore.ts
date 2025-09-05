// src/store/useLeadStore.ts
import {create} from "zustand";
import { devtools } from "zustand/middleware";

export type Interaction = {
  id?: string;
  title: string;
  text?: string;
  time?: string;
  status?: string;
};

export type Lead = {
  id: string;
  name: string;
  role?: string;
  email?: string;
  company?: string;
  campaign?: string;
  status?: "Pending" | "Contacted" | "Responded" | "Converted" | "Do Not Contact";
  lastContact?: string;
  avatarUrl?: string;
  interactions?: Interaction[];
};

type FilterState = { query: string; status: string | "" };
type UIState = { isSlideOpen: boolean; isLoading: boolean };

type LeadStore = {
  leads: Lead[];
  selectedLeadId: string | null;
  filters: FilterState;
  ui: UIState;

  // actions
  setLeads: (leads: Lead[]) => void;
  appendLeads: (leads: Lead[]) => void;
  addOrUpdateLead: (lead: Lead) => void;
  removeLeadById: (id: string) => void;

  setSelectedLeadId: (id: string | null) => void;
  openSlideFor: (id: string) => void;
  closeSlide: () => void;

  setFilterQuery: (q: string) => void;
  setFilterStatus: (s: string | "") => void;
  resetFilters: () => void;

  setLoading: (v: boolean) => void;
};

export const useLeadStore = create<LeadStore>()(
  devtools((set, get) => ({
    leads: [],
    selectedLeadId: null,
    filters: { query: "", status: "" },
    ui: { isSlideOpen: false, isLoading: false },

    setLeads: (leads) => set({ leads }),
    appendLeads: (leads) => set((s) => ({ leads: [...s.leads, ...leads] })),

    addOrUpdateLead: (lead) =>
      set((state) => {
        const idx = state.leads.findIndex((l) => l.id === lead.id);
        if (idx === -1) return { leads: [lead, ...state.leads] };
        const copy = state.leads.slice();
        copy[idx] = { ...copy[idx], ...lead };
        return { leads: copy };
      }),

    removeLeadById: (id) => set((s) => ({ leads: s.leads.filter((l) => l.id !== id) })),

    setSelectedLeadId: (id) => set({ selectedLeadId: id }),

    openSlideFor: (id) => set({ selectedLeadId: id, ui: { ...get().ui, isSlideOpen: true } }),

    closeSlide: () => set({ selectedLeadId: null, ui: { ...get().ui, isSlideOpen: false } }),

    setFilterQuery: (q) => set((s) => ({ filters: { ...s.filters, query: q } })),

    setFilterStatus: (status) => set((s) => ({ filters: { ...s.filters, status } })),

    resetFilters: () => set({ filters: { query: "", status: "" } }),

    setLoading: (v) => set((s) => ({ ui: { ...s.ui, isLoading: v } })),
  }))
);

export default useLeadStore;
