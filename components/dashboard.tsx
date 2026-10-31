"use client";

import { memo, useEffect, useMemo, useState } from "react";
import {
  Activity as ActivityIcon, ArrowDownRight, ArrowUpRight, Bell, CalendarDays,
  Check, ChevronDown, ChevronLeft, ChevronRight, Command, Download, Filter,
  LayoutDashboard, Menu, Moon, MoreHorizontal, Search, Settings, Sun, Users,
  Wallet, X
} from "lucide-react";
import { Activity, activities, formatCurrency, formatNumber } from "@/lib/data";
import { ChannelChart, RevenueChart, TrafficChart } from "@/components/charts";

const StatCard = memo(function StatCard({ title, value, change, positive, icon: Icon, note }: {
  title: string; value: string; change: string; positive: boolean; icon: React.ElementType; note: string;
}) {
  return (
    <article className="stat-card">
      <div className="stat-top"><span>{title}</span><span className="stat-icon"><Icon size={17}/></span></div>
      <div className="stat-value">{value}</div>
      <div className="stat-bottom"><span className={positive ? "change positive" : "change negative"}>{positive ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>} {change}</span><span>{note}</span></div>
    </article>
  );
});

export default function Dashboard() {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState("All channels");
  const [range, setRange] = useState("Last 30 days");
  const [sortKey, setSortKey] = useState<keyof Activity>("date");
  const [sortAsc, setSortAsc] = useState(false);
  const [page, setPage] = useState(1);
  const [mobileNav, setMobileNav] = useState(false);
  const pageSize = 6;

  useEffect(() => {
    const saved = document.documentElement.classList.contains("dark");
    setDark(saved);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try { localStorage.setItem("pulse-theme", next ? "dark" : "light"); } catch {}
  };

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = new Date("2025-10-31T12:00:00");
    const days = range === "Last 7 days" ? 7 : range === "Last 90 days" ? 90 : 30;
    return activities
      .filter((item) => channel === "All channels" || item.channel === channel)
      .filter((item) => {
        if (!query) return true;
        return [item.name, item.email, item.channel, item.status].some((field) => field.toLowerCase().includes(query));
      })
      .filter((item) => (now.getTime() - new Date(`${item.date}T12:00:00`).getTime()) / 86400000 <= days)
      .sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const result = typeof av === "number" && typeof bv === "number" ? av - bv : String(av).localeCompare(String(bv));
        return sortAsc ? result : -result;
      });
  }, [search, channel, range, sortKey, sortAsc]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visibleRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const changeSort = (key: keyof Activity) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
    setPage(1);
  };
  const changeSearch = (value: string) => { setSearch(value); setPage(1); };

  const exportCsv = () => {
    const headers = ["Name", "Email", "Channel", "Date", "Sessions", "Revenue", "Status"];
    const rows = filtered.map((r) => [r.name, r.email, r.channel, r.date, r.sessions, r.revenue, r.status]);
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url; link.download = "pulse-analytics.csv"; link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand"><span className="brand-symbol"><ActivityIcon size={19}/></span><span>pulse<span className="brand-dot">.</span></span><button className="close-nav" onClick={() => setMobileNav(false)} aria-label="Close menu"><X size={18}/></button></div>
        <div className="workspace-switch"><span className="workspace-avatar">S</span><span><b>Studio workspace</b><small>Free plan</small></span><ChevronDown size={15}/></div>
        <div className="nav-caption">WORKSPACE</div>
        <nav className="side-nav">
          <a className="side-link selected" href="#"><LayoutDashboard size={17}/> Overview</a>
          <a className="side-link" href="#activity"><ActivityIcon size={17}/> Analytics</a>
          <a className="side-link" href="#activity"><Users size={17}/> Audience</a>
          <a className="side-link" href="#revenue"><Wallet size={17}/> Revenue</a>
        </nav>
        <div className="nav-caption tools-caption">PREFERENCES</div>
        <nav className="side-nav">
          <a className="side-link" href="#settings"><Settings size={17}/> Settings</a>
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon">✦</div><b>Need a hand?</b><p>Visit our help center to get the most out of Pulse.</p><a href="mailto:help@example.com">Get support <ArrowUpRight size={13}/></a></div><div className="profile-row"><div className="profile-avatar">JD</div><span><b>Jamie Davis</b><small>jamie@studio.co</small></span><MoreHorizontal size={18}/></div></div>
      </aside>
      {mobileNav && <button className="nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Close navigation"/>}
      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left"><button className="mobile-nav-button" onClick={() => setMobileNav(true)} aria-label="Open menu"><Menu size={20}/></button><span className="breadcrumb-muted">Workspace</span><span className="breadcrumb-slash">/</span><b>Overview</b></div>
          <div className="topbar-actions"><div className="top-search"><Search size={15}/><input aria-label="Search dashboard" placeholder="Search anything..." value={search} onChange={(e) => changeSearch(e.target.value)}/><kbd>⌘ K</kbd></div><button className="icon-button" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun size={17}/> : <Moon size={17}/>}</button><button className="icon-button notification-button" aria-label="Notifications"><Bell size={17}/><i/></button><div className="top-avatar">JD</div></div>
        </header>
        <div className="content-wrap">
          <section className="page-heading"><div><div className="overline">MONDAY, OCTOBER 31, 2025</div><h1>Good morning, Jamie <span>✦</span></h1><p>Here's what's happening with your store today.</p></div><div className="heading-actions"><button className="outline-button" onClick={exportCsv}><Download size={15}/> Export</button><button className="primary-button"><span>＋</span> Add widget</button></div></section>
          <section className="stats-grid">
            <StatCard title="Total revenue" value="$48,294" change="12.8%" positive icon={Wallet} note="vs. last month"/>
            <StatCard title="Total visitors" value="24,892" change="8.2%" positive icon={Users} note="vs. last month"/>
            <StatCard title="Conversion rate" value="3.64%" change="2.4%" positive icon={ActivityIcon} note="vs. last month"/>
            <StatCard title="Avg. order value" value="$86.42" change="1.6%" positive={false} icon={CalendarDays} note="vs. last month"/>
          </section>

          <section className="charts-grid" id="revenue">
            <article className="panel revenue-panel"><div className="panel-heading"><div><h2>Revenue overview</h2><p>Track your revenue performance over time</p></div><button className="select-button"><span>Yearly</span><ChevronDown size={14}/></button></div><div className="revenue-summary"><strong>$48,294.00</strong><span className="trend-pill"><ArrowUpRight size={13}/> 12.8%</span><small>vs. $42,805 last year</small></div><div className="revenue-chart"><RevenueChart dark={dark}/></div><div className="chart-legend"><span><i className="legend-violet"/> This year</span><span><i className="legend-dashed"/> Last year</span></div></article>
            <article className="panel traffic-panel"><div className="panel-heading"><div><h2>Traffic sources</h2><p>Where your visitors come from</p></div><button className="more-button" aria-label="More traffic options"><MoreHorizontal size={19}/></button></div><div className="traffic-chart"><ChannelChart dark={dark}/></div><div className="traffic-footer"><span><i/> +4.6% from last month</span><b>View report <ArrowUpRight size={13}/></b></div></article>
          </section>

          <section className="panel activity-panel" id="activity"><div className="panel-heading activity-heading"><div><h2>Recent activity</h2><p>Keep track of your latest customers and transactions</p></div><button className="outline-button small-export" onClick={exportCsv}><Download size={14}/> Export CSV</button></div>
            <div className="table-toolbar"><div className="table-search"><Search size={15}/><input placeholder="Search by name, email or channel..." value={search} onChange={(e) => changeSearch(e.target.value)}/>{search && <button onClick={() => changeSearch("")} aria-label="Clear search"><X size={14}/></button>}</div><div className="filter-actions"><label className="filter-select"><Filter size={14}/><select aria-label="Filter by channel" value={channel} onChange={(e) => {setChannel(e.target.value);setPage(1);}}><option>All channels</option><option>Organic</option><option>Social</option><option>Direct</option><option>Email</option><option>Referral</option></select><ChevronDown size={13}/></label><label className="filter-select date-select"><CalendarDays size={14}/><select aria-label="Date range" value={range} onChange={(e) => {setRange(e.target.value);setPage(1);}}><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select><ChevronDown size={13}/></label></div></div>
            <div className="table-scroll"><table><thead><tr><th><button onClick={() => changeSort("name")}>Customer <span>↕</span></button></th><th><button onClick={() => changeSort("channel")}>Channel <span>↕</span></button></th><th><button onClick={() => changeSort("date")}>Date <span>↕</span></button></th><th><button onClick={() => changeSort("sessions")}>Sessions <span>↕</span></button></th><th><button onClick={() => changeSort("revenue")}>Revenue <span>↕</span></button></th><th>Status</th><th/></tr></thead><tbody>
              {visibleRows.map((item) => <tr key={item.id}><td><div className="customer-cell"><span className={`customer-avatar avatar-${item.id % 5}`}>{item.name.split(" ").map((n) => n[0]).join("").slice(0,2)}</span><span><b>{item.name}</b><small>{item.email}</small></span></div></td><td><span className="channel-cell"><i className={`channel-dot ${item.channel.toLowerCase()}`}/>{item.channel}</span></td><td className="date-cell">{new Date(`${item.date}T12:00:00`).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}</td><td>{formatNumber(item.sessions)}</td><td className="revenue-cell">{formatCurrency(item.revenue)}</td><td><span className={`status status-${item.status.toLowerCase().replace(" ","-")}`}><i/>{item.status}</span></td><td><button className="row-more" aria-label={`More options for ${item.name}`}><MoreHorizontal size={17}/></button></td></tr>)}
              {visibleRows.length === 0 && <tr><td colSpan={7} className="empty-state">No matching activity. Try a different search or filter.</td></tr>}
            </tbody></table></div>
            <div className="table-footer"><span>Showing <b>{filtered.length ? (page - 1) * pageSize + 1 : 0}-{Math.min(page * pageSize, filtered.length)}</b> of <b>{filtered.length}</b> results</span><div className="pagination"><button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page"><ChevronLeft size={15}/></button><span>Page {page} of {totalPages}</span><button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} aria-label="Next page"><ChevronRight size={15}/></button></div></div>
          </section>
          <footer className="page-footer"><span>© 2025 Pulse Analytics. All rights reserved.</span><span>Data refreshes automatically <i/></span></footer>
        </div>
      </main>
    </div>
  );
}
