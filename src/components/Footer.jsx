import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#008000',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
    position: 'fixed', 
    left: '0',
    bottom: '0',
    width: '100%',
  };

  return (
    <footer style={footerStyle}>
      &copy; Copyright DP 2023. All rights reserved.
    </footer>
  );
}

export default Footer;
