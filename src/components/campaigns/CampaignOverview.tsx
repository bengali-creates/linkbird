 
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Campaign } from "@/store/useCampaignStore";


export default function CampaignOverview({ campaign }: { campaign: Campaign }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card><CardContent className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Total Leads</div>
            <div className="text-2xl font-semibold">{campaign.totalLeads}</div>
          </div>
          <div className="text-slate-400">👥</div>
        </CardContent></Card>

        <Card><CardContent className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Request Sent</div>
            <div className="text-2xl font-semibold">{campaign.requestSent}</div>
          </div>
          <div className="text-slate-400">✉️</div>
        </CardContent></Card>

        <Card><CardContent className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Request Accepted</div>
            <div className="text-2xl font-semibold">{campaign.requestAccepted}</div>
          </div>
          <div className="text-slate-400">💬</div>
        </CardContent></Card>

        <Card><CardContent className="flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">Request Replied</div>
            <div className="text-2xl font-semibold">{campaign.requestReplied}</div>
          </div>
          <div className="text-slate-400">🎯</div>
        </CardContent></Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold mb-3">Campaign Progress</h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Leads Contacted</span>
                  <span>{campaign.progress.contactedPercent}%</span>
                </div>
                <Progress value={campaign.progress.contactedPercent} className="h-2 rounded" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Acceptance Rate</span>
                  <span>{campaign.progress.acceptancePercent}%</span>
                </div>
                <Progress value={campaign.progress.acceptancePercent} className="h-2 rounded" />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Reply Rate</span>
                  <span>{campaign.progress.replyPercent}%</span>
                </div>
                <Progress value={campaign.progress.replyPercent} className="h-2 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="text-sm font-semibold mb-3">Campaign Details</h3>
            <div className="text-sm text-slate-600 space-y-2">
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Start Date</span>
                <span>{campaign.startDate ?? "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Status</span>
                <span>{campaign.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Conversion Rate</span>
                <span>{(campaign.conversionRate ?? 0).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
