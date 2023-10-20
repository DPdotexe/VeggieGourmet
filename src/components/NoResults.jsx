import React from 'react';
import '../css/NoResults.css'; // Assicurati di avere un file CSS per lo stile

function NoResults() {
  return (
    <div className="no-results">
         <img src="./img/notfound.png" alt="No Results" />
      <p>Sorry, no recipes were found for your search.</p>
      <p>You can try a different recipes or explore some random recipes.</p>
    </div>
  );
}

export default NoResults;
