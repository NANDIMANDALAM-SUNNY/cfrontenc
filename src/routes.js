import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/Order';
import LoginPage from './sections/auth/login/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CreateOrUpdate from './pages/CreateOrUpdate';
import Register from './sections/auth/login/Register';
import ForgotPassword from './sections/auth/login/ForgotPassword';
import ResetPassword from './sections/auth/login/ResetPassword';
import ConfirmAccount from './sections/auth/login/ConfirmAccount';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'orders', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'addproduct/:id', element: <CreateOrUpdate /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'forgotpassword',
      element: <ForgotPassword />,
    },
    {
      path: 'resetpassword/:token',
      element: <ResetPassword />,
    },
    {
      path: 'confirmAccount/:confirmationToken',
      element: <ConfirmAccount />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
