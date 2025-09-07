// paste this next to your Campaign type or import the type if you have it defined elsewhere
import { Campaign } from "@/store/useCampaignStore";
/**
 * Generate n mock campaigns with internally-consistent fields.
 */
export function makeCampaigns(n: number = 20): Campaign[] {
  const names = [
    "Just Herbs",
    "Juicy Chemistry",
    "HyugaLife",
    "HoneyVeda",
    "HempStreet",
    "GreenRoots",
    "PureLeaf",
    "Urban Botanics",
    "NaturaWell",
    "HerbLab"
  ];

  const descriptions = [
    "Targeting herb enthusiasts across channels.",
    "Cold outreach campaign focused on small businesses.",
    "Partnership outreach to micro-influencers.",
    "Pilot campaign for new product launch.",
    "Re-engagement campaign for dormant leads.",
    "Seasonal promo focused on repeat customers."
  ];

  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const choose = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

  const randomStatus = (): Campaign["status"] => {
    const r = Math.random();
    if (r < 0.7) return "Active"; // 70%
    if (r < 0.9) return "Inactive"; // 20%
    return "Draft"; // 10%
  };

  const daysAgo = (maxDays: number) =>
    new Date(Date.now() - Math.floor(Math.random() * maxDays) * 24 * 60 * 60 * 1000).toISOString();

  return Array.from({ length: n }).map((_, i) => {
    const totalLeads = rand(10, 1000); // total leads range
    const requestSent = rand(0, totalLeads);
    const requestAccepted = requestSent > 0 ? rand(0, requestSent) : 0;
    const requestReplied = requestAccepted > 0 ? rand(0, requestAccepted) : 0;

    // progress percentages (safe divisions)
    const contactedPercent = totalLeads ? Math.round((requestSent / totalLeads) * 100) : 0;
    const acceptancePercent = requestSent ? Math.round((requestAccepted / requestSent) * 100) : 0;
    const replyPercent = requestAccepted ? Math.round((requestReplied / requestAccepted) * 100) : 0;

    // conversionRate = replies / totalLeads * 100 (two decimals)
    const conversionRate =
      totalLeads > 0 ? Math.round((requestReplied / totalLeads) * 10000) / 100 : 0;

    return {
      id: String(1000 + i),
      name: `${choose(names)} ${i + 1}`,
      status: randomStatus(),
      totalLeads,
      requestSent,
      requestAccepted,
      requestReplied,
      startDate: daysAgo(365), // within last year
      conversionRate,
      progress: {
        contactedPercent,
        acceptancePercent,
        replyPercent,
      },
      description: choose(descriptions),
    } as Campaign;
  });
}
