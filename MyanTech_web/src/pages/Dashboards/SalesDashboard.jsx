import React from 'react'
import GeneralCard from '../../components/Dashboard/GeneralCard'
import LineChartC from '../../components/Dashboard/LineChart'

import HomeCard from '../../components/Dashboard/HomeCard';
import Popular from '../../components/Dashboard/Popular';
import PieChart from '../../components/Dashboard/PieChart';





const SalesDashboard = () => {

   

  return (
    <>
    <div className=''>
      <HomeCard />  
      
    </div>
    <div className="flex justify-between my-5">
          <div className=" w-[40%]">
            <h2 className='mb-3 text-xl font-semibold text-gradient'>Popular Products</h2>
            <Popular />
        </div>
        <div className=" w-[60%]">
            <h2 className='mb-3 text-xl font-semibold text-gradient'>Monthly Sales</h2>

                <LineChartC />
        </div>

    </div>

    <div className=" w-[400px]">
        <PieChart />
    </div>
    </>
  )
}

export default SalesDashboard
