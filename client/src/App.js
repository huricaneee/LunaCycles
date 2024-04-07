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
                    {user ? `Welcome back, ${user.name}` : 'Please log in.'}
                    {user &&
                        <button onClick={handleLogout}>Logout</button>} {/* Logout button */}
                </header>
                <PeriodProvider>
                    <LandingPage/>
                </PeriodProvider>
            </div>
        </UserContext.Provider>
    );
}

export default App;