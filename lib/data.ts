export type Channel = "Organic" | "Social" | "Direct" | "Email" | "Referral";
export type Activity = {
  id: number;
  name: string;
  email: string;
  channel: Channel;
  date: string;
  sessions: number;
  revenue: number;
  status: "Converted" | "In progress" | "New";
};

export const revenueData = [
  { month: "Jan", revenue: 18400, previous: 15100 },
  { month: "Feb", revenue: 22100, previous: 17800 },
  { month: "Mar", revenue: 19800, previous: 18600 },
  { month: "Apr", revenue: 26700, previous: 20400 },
  { month: "May", revenue: 24300, previous: 21900 },
  { month: "Jun", revenue: 31200, previous: 23100 },
  { month: "Jul", revenue: 28900, previous: 24800 },
  { month: "Aug", revenue: 35600, previous: 26900 },
  { month: "Sep", revenue: 33100, previous: 28100 },
  { month: "Oct", revenue: 40800, previous: 30200 },
  { month: "Nov", revenue: 37900, previous: 32700 },
  { month: "Dec", revenue: 46200, previous: 35100 }
];

export const trafficData = [
  { name: "Mon", visitors: 3200, conversions: 210 },
  { name: "Tue", visitors: 4100, conversions: 290 },
  { name: "Wed", visitors: 3600, conversions: 255 },
  { name: "Thu", visitors: 5200, conversions: 380 },
  { name: "Fri", visitors: 4700, conversions: 342 },
  { name: "Sat", visitors: 6100, conversions: 430 },
  { name: "Sun", visitors: 5500, conversions: 395 }
];

export const channelData = [
  { name: "Organic", value: 42, color: "#7667f5" },
  { name: "Social", value: 25, color: "#20b995" },
  { name: "Direct", value: 18, color: "#f3a64a" },
  { name: "Email", value: 10, color: "#e879a8" },
  { name: "Referral", value: 5, color: "#7d91ad" }
];

export const activities: Activity[] = [
  { id: 1, name: "Olivia Rhye", email: "olivia@layers.io", channel: "Organic", date: "2025-10-28", sessions: 124, revenue: 2480, status: "Converted" },
  { id: 2, name: "Phoenix Baker", email: "phoenix@sisyphus.com", channel: "Social", date: "2025-10-28", sessions: 98, revenue: 1840, status: "In progress" },
  { id: 3, name: "Lana Steiner", email: "lana@circooles.com", channel: "Direct", date: "2025-10-27", sessions: 87, revenue: 960, status: "Converted" },
  { id: 4, name: "Demi Wilkinson", email: "demi@catalog.com", channel: "Email", date: "2025-10-27", sessions: 76, revenue: 720, status: "New" },
  { id: 5, name: "Candice Wu", email: "candice@quotient.com", channel: "Organic", date: "2025-10-26", sessions: 154, revenue: 3120, status: "Converted" },
  { id: 6, name: "Natali Craig", email: "natali@layers.io", channel: "Referral", date: "2025-10-26", sessions: 65, revenue: 540, status: "In progress" },
  { id: 7, name: "Drew Cano", email: "drew@sisyphus.com", channel: "Social", date: "2025-10-25", sessions: 112, revenue: 1260, status: "Converted" },
  { id: 8, name: "Orlando Diggs", email: "orlando@circooles.com", channel: "Direct", date: "2025-10-24", sessions: 59, revenue: 430, status: "New" },
  { id: 9, name: "Andi Lane", email: "andi@catalog.com", channel: "Organic", date: "2025-10-23", sessions: 143, revenue: 2780, status: "Converted" },
  { id: 10, name: "Kate Morrison", email: "kate@quotient.com", channel: "Email", date: "2025-10-22", sessions: 91, revenue: 890, status: "In progress" },
  { id: 11, name: "Morgan Chen", email: "morgan@layers.io", channel: "Social", date: "2025-10-21", sessions: 72, revenue: 640, status: "New" },
  { id: 12, name: "Alex Morgan", email: "alex@sisyphus.com", channel: "Organic", date: "2025-10-20", sessions: 133, revenue: 2310, status: "Converted" },
  { id: 13, name: "Riley Smith", email: "riley@circooles.com", channel: "Referral", date: "2025-10-19", sessions: 48, revenue: 390, status: "New" },
  { id: 14, name: "Taylor Kim", email: "taylor@catalog.com", channel: "Direct", date: "2025-10-18", sessions: 105, revenue: 1450, status: "Converted" },
  { id: 15, name: "Jordan Lee", email: "jordan@quotient.com", channel: "Social", date: "2025-10-17", sessions: 82, revenue: 780, status: "In progress" }
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
