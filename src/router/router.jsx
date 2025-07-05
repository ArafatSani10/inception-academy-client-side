import {
    createBrowserRouter,

} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Pages/Home/Home";
import CourseDetails from "../Components/Pages/Home/CourseDetails/CourseDetails";
import Login from "../Components/Pages/Login/Login";
import Register from "../Components/Pages/Register/Register";
import Dashboard from "../DashboardCreation/Dashboard/Dashboard";
import AdminHome from "../DashboardCreation/Dashboard/AdminHome/AdminHome";
import PrivateRoute from "./PrivateRoute";
import AllUser from "../DashboardCreation/Dashboard/AdminHome/AllUser/AllUser";
import AddInstructor from "../DashboardCreation/Dashboard/AddInstructor/AddInstructor";
import AdminRoute from "./AdminRoute";
import Instructors from "../Components/Pages/Instructors/Instructors";
import OurCourses from "../Components/Pages/Home/OurCourses/OurCourses";
import Cart from "../DashboardCreation/Dashboard/Cart/Cart";
import Payment from "../DashboardCreation/Dashboard/Payment/Payment";
import PaymentHistory from "../DashboardCreation/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../DashboardCreation/Dashboard/UserDashboard/UserHome/UserHome";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/courses/:id',
                element: <CourseDetails></CourseDetails>,
                loader: ({ params }) => fetch(`http://localhost:5000/academyCourse/${params.id}`)
            },

            {
                path: '/login',
                element: <Login></Login>
            },

            {
                path: '/courses',
                element: <OurCourses></OurCourses>
            },

            {
                path: '/register',
                element: <Register></Register>
            },

            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
        ],
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // user routes

            {
                path: 'cart',
                element: <Cart></Cart>
            },

            {
                path: 'payment',
                element: <Payment></Payment>
            },

            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },

            {
                path:'userHome',
                element:<UserHome></UserHome>
            },


            // admin routes
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },

            {
                path: 'allUser',
                element: <AdminRoute><AllUser></AllUser></AdminRoute>
            },

            {
                path: 'addInstructor',
                element: <AdminRoute><AddInstructor></AddInstructor></AdminRoute>
            },
        ],
    },
]);

export default router;