import "./LandingPage.css";
import "./Calendar.js"
import Calendar from "./Calendar.js";
import React from "react";

function LandingPage() {
    return (
        <div className="mainContainer">
            <Calendar/>
        </div>
    );
}

export default LandingPage;