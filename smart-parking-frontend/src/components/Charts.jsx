import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList,
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

const Charts = ({ data }) => {
  const cityStats = Object.entries(
    data.reduce((acc, spot) => {
      if (!acc[spot.city]) {
        acc[spot.city] = { city: spot.city, total: 0, occupied: 0 };
      }
      acc[spot.city].total += 1;
      if (spot.isOccupied) acc[spot.city].occupied += 1;
      return acc;
    }, {})
  ).map(([_, stats]) => ({
    ...stats,
    available: stats.total - stats.occupied,
  }));

  const totalOccupied = data.filter((s) => s.isOccupied).length;
  const totalAvailable = data.length - totalOccupied;

  const pieData = [
    { name: "Dolu", value: totalOccupied },
    { name: "Boş", value: totalAvailable },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-lg font-bold mb-2">Şehir Bazlı Otopark Durumu</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={cityStats} layout="vertical">
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="city" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="occupied" stackId="a" fill="#FF8042" name="Dolu">
              <LabelList dataKey="occupied" position="insideRight" />
            </Bar>
            <Bar dataKey="available" stackId="a" fill="#00C49F" name="Boş">
              <LabelList dataKey="available" position="insideRight" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Genel Doluluk Oranı</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;