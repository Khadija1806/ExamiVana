import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
}

export default Spinner;