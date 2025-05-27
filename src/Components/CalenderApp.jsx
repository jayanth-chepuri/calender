import {useState} from 'react';
export default function CalenderApp()
{
    const daysofWeek = ['sun','mon','tue','wed','thu','fri','sat']
    const monthsofYear = [
      'January',
      'February',
      'March','April','may','June','July','August','September','October','November','December']
       
      const currentDate = new Date();

      const [currentMonth, setcurrentMonth] = useState(currentDate.getMonth());
      const [currentYear, setcurrentyear] = useState(currentDate.getFullYear());
      const [selecteddate, setselecteddate] = useState(currentDate);
      const [showeventpopup, setshowevenpopup] = useState(false);
      const [events, setevents] = useState([]);
      const [eventtime, seteventtime] = useState({ hour:'00',min:'00'});
      const [eventdata, seteventdata] = useState("");
      const [editingIndex, setEditingIndex] = useState(null);

      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const firstDayinMonth = new Date(currentYear, currentMonth,1).getDay();

const prevMonth = () => {
  let newMonth = currentMonth - 1;
  let newYear = currentYear;

  if (newMonth < 0) {
    newMonth = 11;
    newYear = currentYear - 1;
  }

  setcurrentMonth(newMonth);
  setcurrentyear(newYear);
};

const nextMonth = () => {
  let newMonth = currentMonth + 1;
  let newYear = currentYear;

  if (newMonth > 11) {
    newMonth = 0;
    newYear = currentYear + 1;
  }

  setcurrentMonth(newMonth);
  setcurrentyear(newYear);
};

const handle = (day) =>{
  const clickedDate = new Date(currentYear, currentMonth, day)
  const today = new Date()

  if(clickedDate>=today)
  {
    setselecteddate(clickedDate)
    setshowevenpopup(true)
    seteventtime({ hour:'00', min:'00' });
    seteventdata("");

  }
};

const handleeventSubmit = () =>
{
  const newEvent = {
    date: selecteddate,
    time: `${eventtime.hour.padStart(2, '0')}:${eventtime.min.padStart(2, '0')}`,
    text: eventdata,
  }
  setevents([...events,newEvent])
  seteventtime({ hour:'00',min:'00'});
  seteventdata("")
  setshowevenpopup(false);
};

  const handleEdit = (index) => {
    const event = events[index];
    setselecteddate(new Date(event.date));
    const [hour, min] = event.time.split(':');
    seteventtime({ hour, min });
    seteventdata(event.text);
    setEditingIndex(index);
    setshowevenpopup(true);
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setevents(updatedEvents);
  };


    return(
        <>
        <div className="calender">
            <div className="calender-App">
                <h1 className="heading">Calender</h1>
                <div className="navigation-bar">
                    <div className="month-year-container">
                        <h2 className="month">{monthsofYear[currentMonth]}, </h2>
                        <h2 className="year">{currentYear}</h2>
                    </div>
                <div className="buttons">
                    <i className='bx bx-chevron-left' onClick={prevMonth}></i>   
                    <i className='bx bx-chevron-right' onClick={nextMonth}></i>
                </div>
                </div>
                <div className="weekdays">
                    {daysofWeek.map((day)=>(
                      <span key={day}>{day}</span>
                    ))}
                </div>
                <div className="days">
                    {[...Array(firstDayinMonth).keys()].map((_,index)=>
                    (
                      <span key={`empty_${index}`}/>
                    ))}
                    {[...Array(daysInMonth).keys()].map((day)=>(
                      <span key={day+1}
                      onClick={()=>handle(day+1)}
                      >{day+1}</span>
                    ))}
                </div>
            </div>
            <div className="event">
              {showeventpopup&& <div className="event-popup">
                <div className="time-input">
                    <div className="event-popup-time">Time</div>
                    <input
          type="number"
          name="hours"
          min={0}
          max={24}
          className="hours" value={eventtime.hour} onChange={(e)=>
             seteventtime({...eventtime, hour: e.target.value})
          }
        />
        <input
          type="number"
          name="minutes"
          min={0}
          max={60}
          className="minutes"
          value={eventtime.min} onChange={(e)=>
             seteventtime({...eventtime, min: e.target.value})
          }
        />
      </div>
      <textarea placeholder="Enter Event Text (Maximum 60 Characters)"maxLength={60} value={eventdata}
      onChange={(e)=>{
        if(e.target.value.length<=60)
        {
          seteventdata(e.target.value)
        }
      }}></textarea>
      <button className="event-popup-btn" onClick={handleeventSubmit}>Add Event</button>
      <button className="close-event-popup" onClick={()=>setshowevenpopup(false)}>
        <i className="bx bx-x"></i>
      </button>
    </div>}
    {events
  .filter(
    (event) =>
      new Date(event.date).toDateString() === selecteddate.toDateString()
  ).map((event,index)=>
    (
       <div className="event" key={index}>
  <div className="event-date-wrapper">
    <div className="event-date">
  {`${monthsofYear[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}
</div>

    <div className="event-time">{event.time}</div>
  </div>
  <div className="event-text">{event.text}</div>
  <div className="event-buttons">
 <i className="bx bxs-edit-alt" onClick={() => handleEdit(index)}></i>
<i className="bx bxs-message-alt-x" onClick={() => handleDelete(index)}></i>
  </div>
</div>
    ))}
    </div>
    </div>
        </>
    );
}



