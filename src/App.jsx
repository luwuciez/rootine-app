import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Weather from "./components/Weather";
import PlantCatalog from "./components/PlantCatalog";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Main>
        <Weather />
        <PlantCatalog />
      </Main>
    </div>
  );
}

export default App;
