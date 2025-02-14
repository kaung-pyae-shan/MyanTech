import { Card } from "antd"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const ProductSalesChart = () => {
  const productData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Books", value: 200 },
    { name: "Home & Garden", value: 100 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <Card title="Product Sales Distribution" style={{ height: 400 }}>
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer className="piechart" width="100%" height="100%">
          <PieChart>
            <Pie
              data={productData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {productData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export default ProductSalesChart
