import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";
import PlantFilter from "./components/PlantFilter";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Main>
        <Weather />
        <PlantFilter />
        <PlantCatalog />
      </Main>
    </div>
  );
}

export default App;
