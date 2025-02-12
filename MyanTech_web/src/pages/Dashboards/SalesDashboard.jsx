import React from 'react'
import GeneralCard from '../../components/Dashboard/GeneralCard'
import LineChartC from '../../components/Dashboard/LineChart'

import HomeCard from '../../components/Dashboard/HomeCard';
import Popular from '../../components/Dashboard/Popular';





const SalesDashboard = () => {

   

  return (
    <>
    <div className=''>
      <HomeCard />  
      
    </div>
    <div className="flex justify-between my-10">
          <div className=" w-[40%]">
            <h2 className='mb-3 text-xl font-semibold text-gradient'>Popular Products</h2>
            <Popular />
        </div>
        <div className=" w-[60%]">
            <h2 className='mb-3 text-xl font-semibold text-gradient'>Monthly Sales</h2>

                <LineChartC />
        </div>
    </div>
    </>
  )
}

export default SalesDashboard
