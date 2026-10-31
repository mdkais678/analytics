"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import { channelData, revenueData, trafficData, formatCurrency } from "@/lib/data";

type ChartProps = { dark: boolean };

const tooltipStyle = (dark: boolean) => ({
  background: dark ? "#171b2a" : "#ffffff",
  border: `1px solid ${dark ? "#30364a" : "#e8eaf0"}`,
  borderRadius: 10,
  color: dark ? "#f4f5fb" : "#202337",
  fontSize: 12
});

export function RevenueChart({ dark }: ChartProps) {
  const tick = dark ? "#9299ad" : "#858b9d";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={revenueData} margin={{ top: 12, right: 8, left: -14, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7667f5" stopOpacity={0.24}/>
            <stop offset="100%" stopColor="#7667f5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke={dark ? "#292f42" : "#eef0f5"} strokeDasharray="4 5" vertical={false}/>
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} dy={10}/>
        <YAxis axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 11 }} tickFormatter={(v) => `$${v / 1000}k`} />
        <Tooltip contentStyle={tooltipStyle(dark)} formatter={(value) => formatCurrency(Number(value))}/>
        <Area type="monotone" dataKey="previous" stroke={dark ? "#68728d" : "#b6bdce"} strokeWidth={2} strokeDasharray="5 5" fill="transparent" name="Previous year"/>
        <Area type="monotone" dataKey="revenue" stroke="#7667f5" strokeWidth={2.7} fill="url(#revenueFill)" name="Revenue" activeDot={{ r: 5, strokeWidth: 0 }}/>
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TrafficChart({ dark }: ChartProps) {
  const tick = dark ? "#9299ad" : "#858b9d";
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={trafficData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }} barGap={5}>
        <CartesianGrid stroke={dark ? "#292f42" : "#eef0f5"} strokeDasharray="4 5" vertical={false}/>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 10 }} dy={8}/>
        <YAxis axisLine={false} tickLine={false} tick={{ fill: tick, fontSize: 10 }}/>
        <Tooltip contentStyle={tooltipStyle(dark)} cursor={{ fill: dark ? "#ffffff0b" : "#7667f50b" }}/>
        <Bar dataKey="visitors" name="Visitors" fill="#7667f5" radius={[5,5,0,0]} maxBarSize={23}/>
        <Bar dataKey="conversions" name="Conversions" fill="#20b995" radius={[5,5,0,0]} maxBarSize={23}/>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ChannelChart({ dark }: ChartProps) {
  return (
    <div className="channel-chart-inner">
      <div className="donut-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={channelData} dataKey="value" nameKey="name" innerRadius="67%" outerRadius="92%" paddingAngle={3} stroke="none">
              {channelData.map((entry) => <Cell key={entry.name} fill={entry.color}/>)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle(dark)} formatter={(value) => `${value}%`}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="donut-center"><strong>100%</strong><span>Traffic</span></div>
      </div>
      <div className="channel-legend">
        {channelData.map((item) => (
          <div className="legend-row" key={item.name}>
            <span className="legend-name"><i style={{ background: item.color }}/>{item.name}</span>
            <b>{item.value}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}
