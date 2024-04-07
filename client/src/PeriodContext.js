import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from './App.js';

export const PeriodContext = React.createContext();

export function PeriodProvider({children}) {
    const {user} = useContext(UserContext);
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5010/period/${user._id}`)
                .then(response => response.json())
                .then(data => setPeriods(data))
                .catch(console.error);
        }
    }, [user]);

    return (
        <PeriodContext.Provider value={{periods, setPeriods}}>
            {children}
        </PeriodContext.Provider>
    );
}