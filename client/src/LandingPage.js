import "./LandingPage.css";
import React from "react";
import Calendar from "./Calendar.js";
import PeriodTable from "./PeriodTable.js";

function LandingPage() {
    return (
        <div className="contentContainer"> {/* Flex container */}
            <div className="mainContainer">
                <Calendar/>
            </div>
            <div className="tableContainer">
                <PeriodTable/>
            </div>
        </div>
    );
}

export default LandingPage;