import React from 'react';
import rwc from '../../rwc-schedule.json';


const RugbySchedule = () => {    
    console.log(new Date());
    console.log(rwc.sport_events[0]);
    console.log(new Date(rwc.sport_events[0].scheduled));
    const weekArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return (
        <div> 
        {
            rwc.sport_events.map((item, i) => {
                let date = new Date(item.scheduled);
                // .toUTCString();
                let dayOfTheWeek = date.getDay();
                let month = date.getMonth();
                let datOfTheMonth = date.getDate();
                
                return (
                    <div key={i}>
                        <span>{item.competitors[0].country} vs {item.competitors[1].country}</span>
                        <p>{weekArray[dayOfTheWeek]}</p>
                        <p>{datOfTheMonth} {monthArray[month]}</p>
                    </div>
                )
            })
        }
        </div>
       

    )
}

export default RugbySchedule;