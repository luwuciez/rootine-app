import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";
import BotBar from "./components/BotBar";
import AddButton from "./components/AddButton";
import PlantFilter from "./components/PlantFilter";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Main>
        <Weather></Weather>
        <PlantFilter></PlantFilter>
        <PlantCatalog></PlantCatalog>
      </Main>
      <BotBar>
        <AddButton></AddButton>
      </BotBar>
    </div>
  );
}

export default App;
