import React from 'react';
import { useStore } from '../../context/storeContext';

type Roles = 'EMPLOYEE' | 'CHIEF'

interface AvailableForProps {
  children: JSX.Element
  roles: Roles[]
} 

const AvailableFor = (props: AvailableForProps): JSX.Element | null => {
  const userStore = useStore('UserStore')

  return (
    props.roles.some(role => role === userStore.role) ? (
      props.children
    ) : (
      null
    )
  );
};

export default AvailableFor;