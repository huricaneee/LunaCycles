import * as React from 'react';
import {useContext, useState} from 'react';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import {UserContext} from './App.js';
import {PeriodContext} from './PeriodContext';

export default function Calendar() {
    const {user, isLoading} = useContext(UserContext);
    const {setPeriods} = useContext(PeriodContext);
    const [dates, setDates] = useState({startDate: null, endDate: null, nextDate: "start"});
    const [message, setMessage] = useState(null);

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