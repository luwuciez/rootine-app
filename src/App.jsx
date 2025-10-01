import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";

function App() {
    return (
        <div className="app">
            <Navbar></Navbar>
            <Main>
                <Weather></Weather>
                <PlantCatalog></PlantCatalog>
            </Main>
        </div>
    );
}

export default App;
