import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";  

const sidebarConfig = [
  {
    name: "Dashboard",
    icon: <DashboardIcon />,
    route: "/dashboard",
  },
  {
    name: "Add Expense",
    icon: <AddCircleIcon />,
    route: "/expense", 
    component: (
      <Link to="/expense" style={{ textDecoration: "none", color: "inherit" }}>
        <AddCircleIcon />
        Add Expense
      </Link>
    ),
  },
  // {
  //   name: "Profile",
  //   icon: <BarChartIcon />,
  //   route: "/profile",
  // },
];

export default sidebarConfig;
