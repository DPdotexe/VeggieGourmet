import React from 'react';
import { ClipLoader } from 'react-spinners';

// Loader setup

const Loader = () => {
  return (
    <div className="loader-container">
      <ClipLoader color="#e52b50" loading={true} size={100} />
    </div>
  );
};

export default Loader;

