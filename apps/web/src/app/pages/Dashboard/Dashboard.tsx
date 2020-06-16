import React from 'react';
import { Helmet } from 'react-helmet-async';

const title = 'Dashboard';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Dashboard" />
      </Helmet>
      <p>DASHBOARD</p>
    </div>
  );
};

export default Dashboard;
