"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Layers,
  Mail,
  Settings,
  Activity,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import useSidebarStore from "@/store/useSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  badge?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home },
      { id: "leads", label: "Leads", href: "/leads", icon: Users },
      { id: "campaign", label: "Campaign", href: "/campaign", icon: Layers },
      { id: "messages", label: "Messages", href: "/messages", icon: Mail, badge: "10+" },
      { id: "linkedin", label: "Linkedin Accounts", href: "/linkedin", icon: Activity },
    ],
  },
  {
    title: "Settings",
    items: [{ id: "billing", label: "Setting & Billing", href: "/settings", icon: Settings }],
  },
  {
    title: "Admin Panel",
    items: [
      { id: "activity", label: "Activity logs", href: "/admin/activity", icon: Activity },
      { id: "userlogs", label: "User logs", href: "/admin/users", icon: Users },
    ],
  },
];

export default function Sidebar({
  profiles,
  user,
}: {
  profiles?: string;
  user?: { name?: string; image?: string };
}) {
  const pathname = usePathname() || "/";
const collapsed = useSidebarStore((s) => s.collapsed);
const toggleSidebar = useSidebarStore((s) => s.toggle);

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Build flat list of nav items to make keyboard navigation easier
  const flatItems: NavItem[] = NAV_SECTIONS.flatMap((s) => s.items);

  useEffect(() => {
    // when collapsing, clear keyboard focus index to avoid confusion
    if (collapsed) setFocusedIndex(null);
  }, [collapsed]);

  useEffect(() => {
    // focus the link if focusedIndex changes
    if (focusedIndex == null) return;
    const el = itemRefs.current[focusedIndex];
    if (el) el.focus();
  }, [focusedIndex]);

  // keyboard handling on the nav container
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (flatItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const next = prev == null ? 0 : Math.min(prev + 1, flatItems.length - 1);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => {
        const next = prev == null ? flatItems.length - 1 : Math.max(prev - 1, 0);
        return next;
      });
    } else if (e.key === "Escape") {
      // collapse sidebar on Escape (optional)
      toggleSidebar;
    } else if (e.key === "Enter" && focusedIndex != null) {
      // activate the focused link
      const el = itemRefs.current[focusedIndex];
      if (el) el.click();
    }
  };

  // helper to compute if an item is active
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Desktop / Tablet Sidebar */}
      <aside
        ref={containerRef}
        className={`hidden md:flex fixed top-0 left-0 h-screen z-50 flex-col bg-white border-r transition-all duration-200 ease-in-out
          ${collapsed ? "w-20" : "w-72"} overflow-hidden`}
        aria-expanded={!collapsed}
      >
        {/* header: logo + collapse toggle */}
        <div className="flex items-center justify-between gap-2 px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center rounded-md text-white font-bold
                ${collapsed ? "w-8 h-8 text-sm" : "w-10 h-10 text-base"}
                bg-gradient-to-br from-sky-500 to-cyan-500`}
            >
              LB
            </div>
            {!collapsed && (
              <div className="flex flex-col leading-tight">
                <div className="text-lg font-semibold text-slate-900">Link<strong className="text-blue-700">B</strong>irdUi</div>
                <div className="text-xs text-slate-500">Your link hub</div>
              </div>
            )}
          </Link>

          {/* collapse toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="rounded-full p-1"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Profile */}
        <div className="px-3">
          <Card className={`w-full ${collapsed ? "p-2" : ""}`}>
            <CardContent className={`flex items-center gap-3 ${collapsed ? "p-2 justify-center" : "p-3"}`}>
              <Avatar className={`${collapsed ? "w-8 h-8" : "w-10 h-10"}`}>
                <AvatarImage src={user?.image || "/avatar-placeholder.png"} alt={user?.name || "User"} />
                <AvatarFallback>{user?.name?.[0] ?? "U"}</AvatarFallback>
              </Avatar>

              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">{user?.name || "You"}</div>
                  <div className="text-xs text-slate-500 truncate">{profiles || "profile"}</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* nav: add keyboard handlers to the container */}
        <nav
          className="flex-1 overflow-auto px-2 py-4"
          role="navigation"
          aria-label="Main"
          onKeyDown={onKeyDown}
          tabIndex={0} // allow container to receive keyboard events
        >
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-6">
              {!collapsed && <div className="text-xs uppercase text-slate-400 px-2 mb-2">{section.title}</div>}

              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const idx = flatItems.findIndex((it) => it.id === item.id);
                  const active = isActive(item.href);
                  return (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        ref={(el) => { itemRefs.current[idx] = el; }}
                        tabIndex={-1} // container handles focus
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm transition-colors
                          ${
                            active
                              ? "bg-slate-100 text-sky-600 font-semibold"
                              : "text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                          }`}
                        aria-current={active ? "page" : undefined}
                        onFocus={() => setFocusedIndex(idx)}
                      >
                        <span
                          className={`flex items-center justify-center rounded-md ${
                            collapsed ? "w-8 h-8" : "w-8 h-8 bg-slate-50"
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${active ? "text-sky-600" : "text-slate-500"}`} />
                        </span>

                        {/* label only when expanded */}
                        {!collapsed && <span className="flex-1 min-w-0">{item.label}</span>}

                        {!collapsed && item.badge && (
                          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full">{item.badge}</span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* footer */}
        <div className="px-3 pb-4 pt-2 border-t">
          <div className="flex items-center gap-2">
            {!collapsed && <Link href="/help" className="flex-1 text-sm text-slate-600 hover:text-slate-800">Help</Link>}
            <Button variant="ghost" size="sm" className="rounded-md p-2" aria-label="Log out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
