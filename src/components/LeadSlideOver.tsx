// components/LeadSheetNoURL.tsx
"use client";

import React, { useEffect } from "react";
import {shallow} from "zustand/shallow";
import useLeadStore from "@/store/useLeadStore";
import type { Interaction } from "@/store/useLeadStore";
// If you need LeadStoreState, import the correct type or define it here if not exported.
type LeadStoreState = ReturnType<typeof useLeadStore.getState>;
// shadcn imports — adjust path if your project differs
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";



export default function LeadSheet() {
   const isOpen = useLeadStore((s) => s.ui.isSlideOpen);
  const selectedLead = useLeadStore((s) => s.leads.find((l) => l.id === s.selectedLeadId) ?? null);
  const closeSlide = useLeadStore((s) => s.closeSlide);

  // close on ESC (optional; shadcn sheet often handles it but double-safety)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeSlide();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeSlide]);

  if (!isOpen || !selectedLead) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => { if (!open) closeSlide(); }}>
      <SheetContent side="right" className="w-full md:w-[520px]">
        <SheetHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={selectedLead.avatarUrl} alt={selectedLead.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <SheetTitle>
                  <div className="text-lg font-semibold">{selectedLead.name}</div>
                </SheetTitle>
                <SheetDescription>
                  <div className="mt-1 text-sm text-slate-500">
                    {selectedLead.role}
                    <span className="mx-2">•</span>
                    <span className="text-xs text-slate-400">{selectedLead.company}</span>
                  </div>
                </SheetDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="text-red-500 hover:bg-red-50 rounded p-2" title="Delete">
                <Trash2 size={18} />
              </button>

              <button
                onClick={() => closeSlide()}
                aria-label="Close"
                className="rounded p-2 bg-slate-100 hover:bg-slate-200"
              >
                
              </button>
            </div>
          </div>
        </SheetHeader>

        <div className="p-6 overflow-auto h-[calc(100vh-140px)]">
          {/* same content as before */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xs text-slate-500">Email</div>
              <div className="font-medium">{selectedLead.email ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Last Contact</div>
              <div className="font-medium">{selectedLead.lastContact ?? "—"}</div>
            </div>

            <div className="md:col-span-2">
              <div className="text-xs text-slate-500">Campaign</div>
              <div className="font-medium">{selectedLead.campaign ?? "—"}</div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Status</div>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                  selectedLead.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                  selectedLead.status === "Contacted" ? "bg-blue-100 text-blue-700" :
                  selectedLead.status === "Responded" ? "bg-indigo-100 text-indigo-700" :
                  selectedLead.status === "Converted" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                  {selectedLead.status}
                </span>
                <button className="px-3 py-1 rounded bg-slate-100 text-sm">Update status</button>
                <button className="px-3 py-1 rounded bg-emerald-600 text-sm text-white">Contact</button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Interaction history</h4>
            <div className="space-y-6">
              {(selectedLead.interactions ?? []).map((it:Interaction, i: number) => (
                <div key={it.id ?? i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${it.status === "done" ? "bg-emerald-500" : "bg-slate-300"}`} />
                    {i < (selectedLead.interactions?.length ?? 0) - 1 && <div className="w-px bg-slate-200 flex-1 my-1" />}
                  </div>
                {/* interaction roadmap  */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{it.title}</div>
                      <div className="text-xs text-slate-400">{it.time}</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{it.text}</div>
                  </div>
                </div>
              ))}

              {(!selectedLead.interactions || selectedLead.interactions.length === 0) && (
                <div className="text-sm text-slate-500">No history yet</div>
              )}
            </div>
          </div>
        </div>

        <SheetFooter>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500">Last updated: {selectedLead.lastContact ?? "—"}</div>
            <div className="flex gap-2">
              <Button variant="ghost">Export</Button>
              <Button>Save</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
