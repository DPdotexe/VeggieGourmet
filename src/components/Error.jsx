import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="error">
      <p className="error-message">{message}</p>
    </div>
  );
};

export default Error;
