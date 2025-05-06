import { useRoutes } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard';
import Expenses from '../features/expenses/Expenses';
import Login from '../features/auth/Login';
import DashboardLayout from '../layout/DashboarLayout';

const RoutesComponent = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'expense', element: <Expenses /> },
      ],
    },
    { path: '/login', element: <Login /> },
    { path: '*', element: <Login /> }, 
  ]);

  return routes;
};

export default RoutesComponent;
