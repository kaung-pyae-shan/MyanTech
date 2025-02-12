import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import ProductTablePage from "../pages/ProductTablePage";
import CreateOrder from "../pages/Order/CreateOrder";
import OrderList from "../pages/Order/OrderList";

import EditOrder from "../pages/Order/EditOrder";



import OrderTable from "../pages/AssignTruck/OrderTable";
import SalesDashboard from "../pages/Dashboards/SalesDashboard";

const Router = () => {
    const config = createBrowserRouter([
      
        {
            path: "/",
            element: <Layout />,
            children: [ 
                {
                    path: '/sales/dashboard',  // Route for ProductTablePage
                    element: <SalesDashboard />
                },    
                {

                    path: '/order-list',

                    element: <OrderList />
                }, 
                {

                    path: '/create-order',

                    element: <CreateOrder />
                }, 
                {

                    path: '/edit-order',

                    element: <EditOrder />
                },  
                {
                    path: '/product',  // Route for ProductTablePage
                    element: <ProductTablePage />
                }, 

                {
                    path: '/assign/truck',  // Route for ProductTablePage
                    element: <OrderTable />
                }, 
              
            // {

            //     path:"/vocab/note",
            //     element: <ProtectedRoute><Note/></ProtectedRoute>,
            // },
            // {
            //     path:"/vocab/revise",
            //     element: <ProtectedRoute><RevisedWord/></ProtectedRoute>,
            //     // element: <RevisedWord/>
            // },
    

            ],
        },
        // {
        //     path:"/user",
        //     element : <User/>

        // },

        // {
        //     path:"/register",
        //     element : <Register/>

        // },
        // {
        //     path:"/login",
        //     element : <Login/>

        // },
        // {
        //     path:"*",
        //     element : <NotFound />

        // }
    ]);

    return <RouterProvider router={config} />;
};

export default Router;
