import * as React from 'react';
import {useContext, useState} from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {UserContext} from './App.js';

export default function Calendar() {
    const {user, isLoading} = useContext(UserContext); // Get the user and isLoading from context
    const [dates, setDates] = useState({startDate: null, endDate: null, nextDate: "start"});
    const [message, setMessage] = useState(null); // Message state

    const handleDateChange = async (date) => {
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
                    user: user,
                    startDate: newDates.startDate?.toISOString(),
                    endDate: newDates.endDate?.toISOString()
                }),
            };

            const response = await fetch('http://localhost:5010/period', period);
            const data = await response.json();

            console.log(data);
            setMessage('Period is recorded.');
        }
    };

    // If the user data is still loading, show a loading message
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateCalendar']}>
                <DateCalendar
                    date={dates.startDate}
                    onChange={handleDateChange}
                />
                {message && <div>{message}</div>}
            </DemoContainer>
        </LocalizationProvider>
    );
}