import React from 'react';

const navbarStyle = {
  backgroundColor: '#008000',
  color: 'white',
  padding: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', 
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: '1',
};

const logoStyle = {
  display: 'flex',
  alignItems: 'center', 
};

const textContainerStyle = {
  marginLeft: '5px',
};

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        <img
          src={process.env.PUBLIC_URL + '/img/veggiegourmetlogo.png'}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="logo"
        />
        <div style={textContainerStyle}>
          <span style={{ fontWeight: 'bold' }}>VeggieGourmet</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
