import React, {createContext, useEffect, useState} from 'react';
import logoImg from "./LunaCyclesLogo.png"
import './App.css';
import LandingPage from "./LandingPage";
import {PeriodProvider} from './PeriodContext';


// Create a user context
export const UserContext = createContext(null);

function App() {

    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [mode, setMode] = useState(0);    //0 = period   1 = mood

    useEffect(() => {
        fetch('http://localhost:5010', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    setUser(data.user);
                }
                setLoading(false);
            });
    }, []);

    const handleMode = () => {
        if (mode === 0)
            setMode(1);
        else
            setMode(0);
    }

    const handleLogout = () => {
        fetch('http://localhost:5010/logout', {
            method: 'DELETE',
            credentials: 'include'
        }).then(() => {
            setUser(null);

            // Redirect the user to the server-side login page
            window.location.href = 'http://localhost:5010/logout';
        });
    };

    // Render the UserContext.Provider and pass the user state in the value prop
    return (
        <UserContext.Provider value={{user, isLoading}}>
            <div className="App">
                <header className="header">
                    <img src={logoImg} className="logo" alt={"logoImg"}></img>
                    <div className='text'>
                        {user ? `Welcome back, ${user.name}` : 'Please log in.'}
                    </div>
                    <div className='button-container'>
                        {user &&
                            <button onClick={handleMode} className='button'> Switch to {mode ? 'period' : 'mood'} tracker</button>} {/* Mode button */}
                        {user &&
                            <button onClick={handleLogout} className='button'>Logout</button>} {/* Logout button */}
                    </div>
                </header>
                <PeriodProvider>
                    <LandingPage mode={mode}/>
                </PeriodProvider>
            </div>
        </UserContext.Provider>
    );
}

export default App;