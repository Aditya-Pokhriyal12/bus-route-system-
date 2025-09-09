import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createHashRouter, RouterProvider} from "react-router-dom"

import HomePage from "./pages/HomePage.jsx";
import DriverAuth from "./pages/DriverAuth.jsx";
import PassengerAuth from "./pages/PassengerAuth.jsx";
import DriverDashboard from "./pages/DriverDashboard.jsx";
import PassengerDashboard from "./pages/PassengerDashboard.jsx";
import About from "./pages/About.jsx";
const router=createHashRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        index: true,
        element:<HomePage/>
      },
      {
        path:"driver/auth",
        element:<DriverAuth />
      },
      {
        path:"passenger/auth",
        element:<PassengerAuth />
      },
      {
        path:"driver/dashboard",
        element:<DriverDashboard/>
      },
      {
        path:"passenger/dashboard",
        element:<PassengerDashboard/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
