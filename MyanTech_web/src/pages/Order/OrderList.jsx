import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

import OrderTab from "../../components/orders/OrderTab";


const OrderList = () => {
   

    return (
        <div className="flex flex-col ">
            <div className="-m-1.5 overflow-x-auto">
                
                <OrderTab />

               
            </div>
        </div>
    );
};

export default OrderList;
