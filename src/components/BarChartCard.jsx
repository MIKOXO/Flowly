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

const BarChartCard = ({ data }) => {
  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "hsl(220, 15%, 65%)" : "hsl(220, 15%, 65%)";

  return (
    <div className="bg-white dark:bg-DarkCard border border-LightBorder dark:border-DarkBorder rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Total Tasks Overview</h3>
      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={35}>
            <CartesianGrid />
            <XAxis dataKey="name" tick={{ fill: textColor }} />
            <YAxis allowDecimals={false} tick={{ fill: textColor }} />
            <Tooltip />
            <Bar
              dataKey="count"
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
