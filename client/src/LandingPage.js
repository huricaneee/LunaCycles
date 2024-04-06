import "./LandingPage.css";
import "./Calendar.js"
import Calendar from "./Calendar.js";

function LandingPage() {
    const Month = "March";
    const day = 20;
    return (
        <div className="mainContainer">
            <Calendar></Calendar>
        </div>
    );
}

export default LandingPage;