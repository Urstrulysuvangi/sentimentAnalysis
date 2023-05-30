import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Vader = ({ data }) => {
  const chartData = [
    { name: "Negative", value: data.neg, label: "Negative" },
    { name: "Neutral", value: data.neu, label: "Neutral" },
    { name: "Positive", value: data.pos, label: "Positive" },
  ];

  const COLORS = ["#FF4136", "#0074D9", "#2ECC40"];

  return (
    <div className="vader-container bg-gray-100 border border-gray-300 p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Analysis</h2>
      <div className="vader-chart">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Vader;
