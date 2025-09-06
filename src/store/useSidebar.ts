// src/store/useSidebar.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type SidebarStore = {
  isOpen: boolean;
  collapsed: boolean;
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
};

const useSidebarStore = create<SidebarStore>()(
  devtools((set) => ({
    isOpen: true,          // whole sidebar visible (for mobile toggle if needed)
    collapsed: false,      // collapsed/expanded width
    toggle: () => set((s) => ({ collapsed: !s.collapsed })),
    collapse: () => set({ collapsed: true }),
    expand: () => set({ collapsed: false }),
  }))
);

export default useSidebarStore;
