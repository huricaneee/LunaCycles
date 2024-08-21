import "./LandingPage.css";
import MyCalendar from "./MyCalendar.js";
import PeriodTable from "./PeriodTable.js";
import SportsTips from "./SportsTips";

function LandingPage({mode}) {
    if (!mode) {
        return (
            <div className="contentContainer"> {/* Flex container */}
                <div className="calendarContainer">
                    <MyCalendar mode={mode}/>
                </div>
                <div className="tableContainer">
                    <PeriodTable/>
                </div>
                <div className="sportsTipsContainer">
                    <SportsTips/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="contentContainer">
                <div className="calendarContainer">
                    <MyCalendar mode={mode}/>
                </div>
            </div>  
        );
    }
}

export default LandingPage;