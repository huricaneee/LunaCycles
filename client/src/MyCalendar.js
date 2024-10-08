import * as React from 'react';
import {useContext, useState} from 'react';
import {UserContext} from './App.js';
import {PeriodContext} from './PeriodContext.js';
import {Calendar} from 'react-calendar';
import PopUpWindow from './PopUpWindow.js';


function MyCalendar({mode}) {
    const {user, isLoading} = useContext(UserContext);
    const {setPeriods} = useContext(PeriodContext);
    const [dates, setDates] = useState({startDate: null, endDate: null, nextDate: "start"});
    const [message, setMessage] = useState(null);
    const [date, setDate] = useState(new Date());
    const [isPopUp, setPopUp] = useState(0);

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

    
    //render a small window for emoji selections
    const handleDateChangeMood = (date) => {
        setPopUp(1);
        return <PopUpWindow/>;
    }

    //this should be saved at MongoDB
    const savedDates = {
        '2024-08-24': '🎉',
        '2024-08-25': '📝'};

    const isToday = (date) => {
        const today = new Date();
        return (date.toISOString().split('T')[0] === today.toISOString().split('T')[0]);
    }

    const renderEmoji = ({date, view}) => {
        const dateString = date.toISOString().split('T')[0];
        return <div>{savedDates[dateString]}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!mode) { //period
        return (
            <div>
                <Calendar onChange={handleDateChangePeriod} value={date}/>
                {message}
            </div>
        );
    } else {   //mood
        return (
            <div>
                {isPopUp &&
                    <PopUpWindow isPopUp={isPopUp} setPopUp={setPopUp}/>}
                <Calendar onChange={handleDateChangeMood} value={date} tileContent={renderEmoji}/>
            </div>
        );
    }
}

export default MyCalendar;