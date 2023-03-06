import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../context/storeContext';

type Role = 'EMPLOYEE' | 'CHIEF'

interface PrivateRouteProps {
  children: JSX.Element
  roles: Role[]
}

const PrivateRoute = observer((props: PrivateRouteProps) => {
  const userStore = useStore('UserStore');

  return (props.roles.some((role) => role === userStore.role)
    ? props.children
    : <Navigate to="/authorize" />
  );
});

export default PrivateRoute;