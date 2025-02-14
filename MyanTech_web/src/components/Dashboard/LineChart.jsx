import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const LineChartC = ({ record }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(record)) {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      const filteredData = record.filter(item => item.orderDate <= today);
      setData(filteredData);
    }
  }, [record]); // Update when record changes

  console.log("Filtered Chart Data:", data);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="orderDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalCashSales" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartC;
