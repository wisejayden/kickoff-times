import React from 'react';
import './GameDate.scss';



const GameDate = ({date, ...props}) => {
  

  return (
    <div className="GameDate">
      {date}
    </div>
  )
}
export default GameDate;


