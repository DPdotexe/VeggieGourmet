import React from 'react';
import { Helmet } from 'react-helmet'; 
import './Error.css';

// Error setup

const ErrorPage = () => {
  return (
    <div className="error-page">
      <Helmet>
        <title>Error - VG </title>
      </Helmet>
      <p className="error-message">An error occurred. Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
