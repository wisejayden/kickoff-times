import React from 'react';
import './Notice.scss';

const Notice = ({message, clickNotice, ...props}) => {
  return (
    <div className="Notice">
      <p onClick={() => clickNotice()} >{message}</p>
    </div>
  )
}

export default Notice;
