import React from 'react'

const PageEnConstruction = ({ timestamp }) => {
  return (
    <div className="page-en-construction">
      <div className="ellipse" />
      <div className="icon-system">
        <img className="vector-icon" alt="" src="/vector.svg" />
        <img className="vector-icon1" alt="" src="/vector1.svg" />
        <img className="vector-icon2" alt="" src="/vector2.svg" />
        <b className="timestamp">{ timestamp }</b>
      </div>
      <div className="page-en-construction-text">Page en construction</div>
      <div className="page-en-construction-bottom" />
    </div>
  );
};

export default PageEnConstruction;