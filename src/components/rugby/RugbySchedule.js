import React from 'react';
import rwc from '../../rwc-schedule.json';


const RugbySchedule = () => {    
    console.log(new Date());
    console.log(rwc.sport_events[0]);
    console.log(new Date(rwc.sport_events[0].scheduled));

    return (
        <div> 
        {
            rwc.sport_events.map((item, i) => {
                return (
                    <div key={i}>
                        <span>{item.competitors[0].country} vs {item.competitors[1].country}</span>
                        <p>{new Date(item.scheduled).toUTCString()}</p>
                    </div>
                )
            })
        }
        </div>
       

    )
}

export default RugbySchedule;