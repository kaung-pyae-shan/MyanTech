import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import ProductTablePage from "../pages/ProductTablePage";
import CreateOrder from "../pages/Order/CreateOrder";
import OrderList from "../pages/Order/OrderList";
import DriverPage from "../pages/AssignTruck/DriverPage";
import EditOrder from "../pages/Order/EditOrder";



import OrderTable from "../pages/AssignTruck/OrderTable";

const Router = () => {
    const config = createBrowserRouter([
      
        {
            path: "/",
            element: <Layout />,
            children: [ 
                {
                    path: '/',
                    element: <Home />
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
                {
                    path: '/drivers',  // Route for ProductTablePage
                    element: <DriverPage />
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
