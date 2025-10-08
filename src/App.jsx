import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";
import BotBar from "./components/BotBar";
import AddButton from "./components/AddButton";

function App() {
  return (
    <div className="app">
      <Navbar></Navbar>
      <Main>
        <Weather></Weather>
        <PlantCatalog></PlantCatalog>
      </Main>
      <BotBar>
        <AddButton></AddButton>
      </BotBar>
    </div>
  );
}

export default App;
