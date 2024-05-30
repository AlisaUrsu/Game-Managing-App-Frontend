import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { User } from './models/user';

interface ProtectedRouteProps {
  children: JSX.Element;
  loggedInUser: User | null;
  requiredRoles?: string[];
}

const ProtectedRoute = ({ children, loggedInUser, requiredRoles }: ProtectedRouteProps) => {
  if (!loggedInUser) {
    return <Navigate to="/home" replace/>;
  }

  if (requiredRoles && !requiredRoles.includes(loggedInUser.role)) {
    return <Navigate to="/home" replace/>;
  }

  return children? children : <Outlet />;
};

export default ProtectedRoute;
