import {useContext} from 'react';
import {PeriodContext} from './PeriodContext';

const SportsTips = () => {
    const {periods} = useContext(PeriodContext);

    const periodStatusStyle = {
        marginTop: '15px',
        marginBottom: '15px',
        color: '#D5ABAE',
        fontWeight: 'bold',
        backgroundColor: 'white',
        fontSize: '28px'
    };

    const containerStyle = {
        position: 'relative'
    };

    // No periods data available
    if (!periods || periods.length === 0) {
        return (
            <div style={containerStyle}>
                <h4 style={periodStatusStyle}>No period data available yet.</h4>
                <h4>Sports Tips</h4>
            </div>
        );
    }

    const latestPeriod = periods[periods.length - 1];

    // Check if the latest period is ongoing.
    const currentDate = new Date();
    const isUserInPeriod = (
        latestPeriod &&
        new Date(latestPeriod.startDate) <= currentDate &&
        currentDate <= new Date(latestPeriod.endDate)
    );

    const suggestionsForPeriod = [
        'Yoga',
        'Walking',
        'Light Dance',
    ];

    const suggestionsForNonPeriod = [
        'Alpine & Rock Climbing',
        'Hiking & Trekking',
        'Trail Running',
    ];

    const suggestions = isUserInPeriod ? suggestionsForPeriod : suggestionsForNonPeriod;

    // Helper function to calculate days until next period
    const calculateDaysUntilNextPeriod = () => {
        const CYCLE_LENGTH = 28;
        const nextPeriodDate = new Date(Date.parse(latestPeriod.endDate) + CYCLE_LENGTH * 24 * 60 * 60 * 1000);
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((currentDate - nextPeriodDate) / oneDay));

        return diffDays;
    };

    return (
        <div style={containerStyle}>
            {isUserInPeriod ? <h4 style={periodStatusStyle}>In period</h4> :
                <h4 style={periodStatusStyle}>{calculateDaysUntilNextPeriod()} days until next period</h4>}
            <h4>Sports Tips</h4>
            <p>Here are some sport suggestions for you:</p>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, textAlign: 'center', marginBottom: '30px'}}>
                {suggestions.map((sport, index) => (
                    <li key={index}>{sport}</li>
                ))}
            </ul>
            <a href="https://arcteryx.com/ca/en/c/womens" target="_blank" rel="noopener noreferrer">
                <img src="/ArcteryxLogo.jpg" alt="Explore ARC'TERYX" style={{width: '30%', height: 'auto'}}/>
            </a>
        </div>
    );
};

export default SportsTips;