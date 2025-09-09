"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

const AVAILABLE_FIELDS = [
  { token: "{{fullName}}", label: "Full Name" },
  { token: "{{firstName}}", label: "First Name" },
  { token: "{{lastName}}", label: "Last Name" },
  { token: "{{jobTitle}}", label: "Job Title" },
];

export default function CampaignSequence() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Message Sequence</h2>

      {/* Request Message */}
      <Card>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="font-medium mb-2 block">Request Message</Label>
            <p className="text-sm text-slate-500 mb-3">Edit your request message here.</p>
            <div className="space-y-2 text-sm text-slate-600">
              {AVAILABLE_FIELDS.map((f) => (
                <div key={f.token}>
                  <span className="font-mono text-sky-600">{f.token}</span> – {f.label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Label className="font-medium">Message Template</Label>
            <Textarea
              placeholder="Hi {{firstName}}, ..."
              className="min-h-[120px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline">Preview</Button>
              <Button>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Message */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Label className="font-medium">Connection Message</Label>
          <Textarea
            placeholder="Edit your connection message here..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline">Preview</Button>
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* First Follow-up */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Label className="font-medium">First Follow-up Message</Label>
          <Textarea
            placeholder="Edit your first follow-up message here..."
            className="min-h-[100px]"
          />

          {/* Scheduling controls */}
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Send</span>
            <Input type="number" defaultValue={1} className="w-20" />
            <Select defaultValue="day">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="welcome">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="After ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="welcome">After Welcome Message</SelectItem>
                <SelectItem value="connection">After Connection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Preview</Button>
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>

      {/* Second Follow-up */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Label className="font-medium">Second Follow-up Message</Label>
          <Textarea
            placeholder="Edit your second follow-up message here..."
            className="min-h-[100px]"
          />

          {/* Scheduling controls */}
          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>Send</span>
            <Input type="number" defaultValue={1} className="w-20" />
            <Select defaultValue="day">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="firstFollow">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="After ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="firstFollow">After First Follow-up</SelectItem>
                <SelectItem value="connection">After Connection</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Preview</Button>
            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
