// app/leads/page.tsx
"use client";

import React, { useEffect } from "react";
import {shallow} from "zustand/shallow";
import useLeadStore, { Lead } from "@/store/useLeadStore";
import LeadSheet from "@/components/LeadSlideOver";

const makeLeads = (n = 24): Lead[] =>
  Array.from({ length: n }).map((_, i) => ({
    id: String(1000 + i),
    name: `Person ${i}`,
    role: ["Regional Head","SEO Growth","Manager"][i % 3],
    email: `person${i}@example.com`,
    company: ["Gynoveda","Digi","Re'equil"][i % 3],
    campaign: `Campaign ${String.fromCharCode(65 + (i % 4))}`,
    status: i % 4 === 0 ? "Pending" : i % 4 === 1 ? "Contacted" : i % 4 === 2 ? "Responded" : "Converted",
    lastContact: `${(i % 60) + 1} mins ago`,
    avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=Person-${i}`,
    interactions: [{ id: "t1", title: "Invitation Request", text: "Hello!", time: "10 mins ago", status: "done" }],
  }));

export default function LeadsPage() {
   const leads = useLeadStore((s) => s.leads);
  const setLeads = useLeadStore((s) => s.setLeads);
  const openSlideFor = useLeadStore((s) => s.openSlideFor);
  const filters = useLeadStore((s) => s.filters);
  const setFilterQuery = useLeadStore((s) => s.setFilterQuery);
  const setFilterStatus = useLeadStore((s) => s.setFilterStatus);

  useEffect(() => {
    setLeads(makeLeads(24)); // replace with API
  }, [setLeads]);

  const filtered = leads.filter((l) => {
    const q = filters.query.trim().toLowerCase();
    const matchesQ = !q || l.name.toLowerCase().includes(q) || (l.email || "").toLowerCase().includes(q) || (l.company || "").toLowerCase().includes(q);
    const matchesStatus = !filters.status || l.status === filters.status;
    return matchesQ && matchesStatus;
  });

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Leads</h1>

          <div className="flex gap-2 items-center">
            <input value={filters.query} onChange={(e) => setFilterQuery(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded-lg border" />
            <select value={filters.status} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 rounded-lg border">
              <option value="">All</option>
              <option>Pending</option>
              <option>Contacted</option>
              <option>Responded</option>
              <option>Converted</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow divide-y">
          <div className="grid grid-cols-12 gap-2 text-sm font-medium text-slate-600 px-4 py-3 border-b">
            <div className="col-span-5">Lead Name / Contact</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-2">Company</div>
            <div className="col-span-1">Campaign</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Last Contact</div>
          </div>

          {filtered.map((lead) => (
            <button key={lead.id} onClick={() => openSlideFor(lead.id)} className="w-full text-left px-4 py-4 grid grid-cols-12 gap-2 items-center hover:bg-gray-50">
              <div className="col-span-5 flex items-center gap-3">
                <img src={lead.avatarUrl} className="w-10 h-10 rounded-full object-cover" alt="" />
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-xs text-slate-500">{lead.role}</div>
                </div>
              </div>
              <div className="col-span-2 text-sm text-slate-700">{lead.email}</div>
              <div className="col-span-2 text-sm text-slate-700">{lead.company}</div>
              <div className="col-span-1 text-sm text-slate-700">{lead.campaign}</div>
              <div className="col-span-1"><span className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === "Pending" ? "bg-yellow-100 text-yellow-700" : lead.status === "Contacted" ? "bg-blue-100 text-blue-700" : lead.status === "Responded" ? "bg-indigo-100 text-indigo-700" : "bg-green-100 text-green-700"}`}>{lead.status}</span></div>
              <div className="col-span-1 text-sm text-slate-500">{lead.lastContact}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Mount the sheet once */}
      <LeadSheet />
    </>
  );
}
