import React, { useEffect, useState } from 'react'
import GeneralCard from '../../components/Dashboard/GeneralCard'
import LineChartC from '../../components/Dashboard/LineChart'

import HomeCard from '../../components/Dashboard/HomeCard';
import Popular from '../../components/Dashboard/Popular';
import PieChart from '../../components/Dashboard/PieChart';
import axios from '../../api/axios';


const SalesDashboard = () => {


  const [dashboard, setDashboard] = useState([])

     useEffect(() => {
           const fetchDashboard = async () => {
               try {
                   const response = await axios.get(`/home`);
                   console.log(response.data);
                   
                   setDashboard(response.data);
               } catch (error) {
                   console.error("Error fetching orders:", error);
               }
           };
           
          fetchDashboard()
       }, []);

   const role = localStorage.getItem('user').role

  


  return (
    <>
    <div className=''>
      <HomeCard />  
      
    </div>
    <div className="flex justify-between my-5 gap-6">
          <div className=" w-[40%]">
            <h2 className='mb-3 text-xl font-semibold text-gradient'>Popular Products</h2>
            <Popular items={dashboard.bestSellingItems} />
        </div>

        {
          // role == 'sales' ?
          <div className=" w-[60%]">
          <h2 className='mb-3 text-xl font-semibold text-gradient'>Monthly Sales</h2>

              <LineChartC record={dashboard.saleChartRecord} />
        
          
         </div>
        //  :
        // <div className=" w-[400px]">
        // <PieChart /> 
        // </div> 
        }
      

        

    </div>

   
    </>
  )
}

export default SalesDashboard
