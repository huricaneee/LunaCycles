import "./LandingPage.css";
import "./DayButton.js"
import DayButton from "./DayButton.js";

function LandingPage() {
    const Month = "March";
    const day = 20;
    return (
        <div className="mainContainer">
            <DayButton></DayButton>
        </div>
    );
}

export default LandingPage;