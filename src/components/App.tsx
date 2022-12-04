import React, { useState, useEffect } from 'react';

import { axiosGetAllPatients, axiosRemovePatient } from '../api/table';
import CustomersList from './CustomersList/CustomersList';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<
    {
      id: string;
      name: string;
      lastname: string;
      gender: string;
      birsday: string;
      position: string;
      email: string;
    }[]
  >([]);

  const getPersons = async () => {
    const { data } = await axiosGetAllPatients();
    setCustomers(data);
  };

  useEffect(() => {
    getPersons();
  }, []);

  const handleRemove = (a?: string): void => {
    axiosRemovePatient(a);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    customers && (
      <CustomersList
        items={customers}
        handleRemove={handleRemove}
        handleSubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    )
  );
};

export default App;
