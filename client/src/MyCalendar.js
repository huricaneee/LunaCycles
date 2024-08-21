import * as React from 'react';
import {useContext, useState} from 'react';
import {UserContext} from './App.js';
import {PeriodContext} from './PeriodContext.js';
import {Calendar} from 'react-calendar';


function MyCalendar({mode}) {
    const {user, isLoading} = useContext(UserContext);
    const {setPeriods} = useContext(PeriodContext);
    const [dates, setDates] = useState({startDate: null, endDate: null, nextDate: "start"});
    const [message, setMessage] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleDateChangePeriod = async (date) => {
        if (dates.nextDate === "start") {
            setDates({startDate: date, endDate: null, nextDate: "end"});
            setMessage('Please choose the end date.');
        } else {
            const newDates = {...dates, endDate: date, nextDate: "start"};
            setDates(newDates);
            setMessage(null);

            const period = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user: user._id,
                    startDate: newDates.startDate,
                    endDate: newDates.endDate
                }),
            };

            const response = await fetch('http://localhost:5010/period', period);
            const data = await response.json();

            setMessage('Period is recorded.');
            setPeriods(prevPeriods => [...prevPeriods, data]);
        }
    };

    const handleDateChangeMood = (date) => {
        
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!mode) {
        return (
            <div>
                <Calendar onChange={handleDateChangePeriod} value={date}/>
                {message}
            </div>
        );
    } else {
        return (
            <div>
                <Calendar onChange={handleDateChangeMood} value={date}/>
            </div>
        );
    }
}

export default MyCalendar;