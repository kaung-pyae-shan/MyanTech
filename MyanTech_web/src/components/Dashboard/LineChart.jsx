import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const LineChartC = ({ record = [] }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(record) && record.length > 0) {
      const today = new Date().toISOString().split("T")[0];

      const filteredData = record
        .filter(item => new Date(item.orderDate) <= new Date(today))
        .map(item => ({
          ...item,
          orderDate: new Date(item.orderDate).toISOString().split("T")[0], // Ensure proper date format
        }))
        .sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate)); // Sort by date

      setData(filteredData);
    }
  }, [record]);

  console.log("Filtered Chart Data:", data);

  return (
    <div style={{ width: "100%", height: "350px" }}> {/* Ensure container height */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="orderDate"
            tickFormatter={(date) => new Date(date).toLocaleDateString()} // Format date for readability
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalCashSales" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartC;
