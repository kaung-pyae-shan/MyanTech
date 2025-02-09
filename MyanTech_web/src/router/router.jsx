import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../Layout/Layout";
import Test from "../pages/Test";



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
                    path: '/',
                    element: <Test />
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
