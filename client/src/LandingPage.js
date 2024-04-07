import "./LandingPage.css";
import React from "react";
import Calendar from "./Calendar.js";
import PeriodTable from "./PeriodTable.js";
import SportsTips from "./SportsTips";

function LandingPage() {
    return (
        <div className="contentContainer"> {/* Flex container */}
            <div className="calendarContainer">
                <Calendar/>
            </div>
            <div className="tableContainer">
                <PeriodTable/>
            </div>
            <div className="sportsTipsContainer">
                <SportsTips/>
            </div>
        </div>
    );
}

export default LandingPage;