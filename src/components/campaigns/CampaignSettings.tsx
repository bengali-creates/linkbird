
"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import useCampaignStore, { Campaign } from "@/store/useCampaignStore";

/**
 * CampaignSettings
 * - campaign: the selected campaign object (passed from parent)
 * - uses zustand store actions to set selectedCampaign and update local cache
 *
 * Replace the fetch calls with your real API endpoints.
 */

export default function CampaignSettings({ campaign }: { campaign: Campaign }) {
  // store actions
  const setSelectedCampaign = useCampaignStore((s) => s.setSelectedCampaign);

  const setLoading = useCampaignStore((s) => s.setLoading);

  // Local editable form state (initialised from prop)
  const [name, setName] = useState(campaign.name);
  const [statusOn, setStatusOn] = useState(campaign.status === "Active");
  const [noPersonalization, setNoPersonalization] = useState(false);
  const [autopilot, setAutopilot] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState<{ id: string; name: string; avatar?: string }[]>([
    // demo account — replace by actual account list if you have
    { id: "acct-1", name: "Jivesh Lakhani", avatar: "/avatar-placeholder.png" },
  ]);
  const [saving, setSaving] = useState(false);

  // keep local fields in sync if campaign prop changes (important when store updates)
  useEffect(() => {
    setName(campaign.name);
    setStatusOn(campaign.status === "Active");
  }, [campaign]);

  const onSave = async () => {
    const payload: Campaign = {
      ...campaign,
      name,
      status: statusOn ? "Active" : "Inactive",
      // noPersonalization & autopilot could be saved inside description or custom fields
      description: campaign.description ?? "",
    };

    try {
      setSaving(true);
      setLoading(true);

      // Replace: call your API to update the campaign
      // await fetch(`/api/campaigns/${campaign.id}`, { method: "PATCH", body: JSON.stringify(payload) });

      // Update store cache so the rest of app has updated campaign
      setSelectedCampaign(payload);

      // if you keep a list in store, make sure to update it as well (call the action you have)
      // e.g., useCampaignStore.getState().addOrUpdateCampaign(payload);

      // simple UI feedback
      setTimeout(() => {
        setSaving(false);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error("Failed to save campaign", err);
      setSaving(false);
      setLoading(false);
    }
  };

  const onDelete = async () => {
    const ok = confirm("Delete campaign? This is irreversible.");
    if (!ok) return;
    try {
      setSaving(true);
      setLoading(true);
      // Replace with real API delete
      // await fetch(`/api/campaigns/${campaign.id}`, { method: "DELETE" });

      // update store — remove from list / clear selected
      // use appropriate store action (example placeholders)
      // useCampaignStore.getState().removeCampaignById(campaign.id);
      // useCampaignStore.getState().clearSelectedCampaign();

      setTimeout(() => {
        setSaving(false);
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error("Delete failed", err);
      setSaving(false);
      setLoading(false);
    }
  };

  const removeAccount = (id: string) => {
    setSelectedAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Campaign Details Card */}
      <Card>
        <CardContent>
          <h3 className="text-lg font-semibold mb-4">Campaign Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Campaign Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="flex flex-col justify-end">
              <Label>Campaign Status</Label>
              <div className="flex items-center gap-3 mt-2">
                <Switch checked={statusOn} onCheckedChange={(v) => setStatusOn(Boolean(v))} />
                <div className="text-sm">{statusOn ? "Active" : "Inactive"}</div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label>Request without personalization</Label>
            <div className="flex items-center gap-3 mt-2">
              <Switch checked={noPersonalization} onCheckedChange={(v) => setNoPersonalization(Boolean(v))} />
              <div className="text-sm text-slate-500">When enabled, send general request templates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Autopilot / Accounts */}
      <Accordion type="single" collapsible>
        <AccordionItem value="autopilot" className="border rounded">
          <AccordionTrigger className="px-4 py-3">
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="font-medium">AutoPilot Mode</div>
                <div className="text-xs text-slate-500">Let the system automatically manage account assignments</div>
              </div>
              <div>
                <Switch checked={autopilot} onCheckedChange={(v) => setAutopilot(Boolean(v))} />
              </div>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 pt-2">
            <div className="mb-2 text-sm text-slate-500">Selected Accounts</div>
            <div className="flex flex-wrap gap-2">
              {selectedAccounts.map((acc) => (
                <div key={acc.id} className="flex items-center gap-2 bg-slate-50 rounded px-3 py-1">
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={acc.avatar} alt={acc.name} />
                    <AvatarFallback>{acc.name?.[0] ?? "U"}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">{acc.name}</div>
                  <button onClick={() => removeAccount(acc.id)} aria-label={`Remove ${acc.name}`} className="text-sm text-red-500 ml-2">×</button>
                </div>
              ))}
            </div>

            <div className="mt-3 text-sm text-slate-500">
              You can choose accounts to be assigned automatically. (UI for selecting accounts can be added here.)
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator />

      {/* Danger Zone */}
      <Card className="border border-red-50 bg-red-50/40">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-red-700">Danger Zone</div>
              <div className="text-sm text-red-600">Irreversible and destructive actions</div>
            </div>
            <div>
              <Button variant="destructive" onClick={onDelete} disabled={saving}>
                Delete Campaign
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Row */}
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={() => { /* reset */ setName(campaign.name); setStatusOn(campaign.status === "Active"); }}>
          Cancel
        </Button>
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
