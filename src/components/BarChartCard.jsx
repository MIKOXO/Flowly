import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartCard = () => {
  const data = [
    { name: "Completed", value: 8 },
    { name: "Active", value: 5 },
    { name: "Pending", value: 2 },
  ];

  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "" : " hsl(220, 15%, 65%)";

  return (
    <div className="bg-bg-LightCard dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Total Tasks Overview</h3>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={35}>
            <CartesianGrid strokeDasharray="" stroke="" />
            <XAxis dataKey="name" tick={{ fill: textColor }} />
            <YAxis tick={{ fill: textColor }} />
            <Tooltip />
            <Bar
              dataKey="value"
              fill="hsl(225, 70%, 55%)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartCard;
