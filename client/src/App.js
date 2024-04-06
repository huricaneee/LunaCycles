import logo from './logo.svg';
import './App.css';
import "./LandingPage.js";
import LandingPage from './LandingPage.js';
import logoImg from "./lunacycle_logo.png"

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={logoImg} className="logo"></img>
      </header>
      <LandingPage></LandingPage>
    </div>
  );
}

export default App;
