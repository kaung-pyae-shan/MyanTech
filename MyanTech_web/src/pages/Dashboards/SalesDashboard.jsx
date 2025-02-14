import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GeneralCard from '../../components/Dashboard/GeneralCard';
import LineChartC from '../../components/Dashboard/LineChart';
import HomeCard from '../../components/Dashboard/HomeCard';
import Popular from '../../components/Dashboard/Popular';
import PieChart from '../../components/Dashboard/PieChart';
import axios from '../../api/axios';

const SalesDashboard = () => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`/home`);
        setDashboard(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchDashboard();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <HomeCard />
      </motion.div>
      <div className="flex justify-between gap-6 my-5">
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-[40%]">
          <h2 className="mb-3 text-xl font-semibold text-gradient">Popular Products</h2>
          <Popular items={dashboard.bestSellingItems} />
        </motion.div>
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="w-[600px]">
          <h2 className="mb-3 text-xl font-semibold text-gradient">Monthly Sales</h2>
          <LineChartC record={dashboard.saleChartRecord} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SalesDashboard;
