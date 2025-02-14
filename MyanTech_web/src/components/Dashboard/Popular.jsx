import React, { useState, useEffect } from "react";
import { Table } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "product_name",
    key: "product_name",
  },
  {
    title: "Total Sell",
    dataIndex: "totalSellQuantity",
    key: "totalSellQuantity",
  },
];

const Popular = ({ items }) => {
  console.log("Received items:", items);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(items)) {
      const formattedData = items.slice(0, 4).map((item, index) => ({
        ...item,
        key: item.product_name || index, // Assign a unique key
      }));
      setData(formattedData);
    }
  }, [items]); // Update when items change

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default Popular;
