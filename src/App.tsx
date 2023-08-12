import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import EnergyGenerator from "../src/components/EnergyGenerator";
import DataShowcase from "../src/components/DataShowcase";
import { Navbar } from "../src/components/Navbar";
import { useSelector } from "react-redux";
const App = () => {
  const authorized = useSelector((state: any) => state.store.authorized);

  return (
    <Router>
      <Navbar />
      {authorized && (
        <Routes>
          <Route path="/generators" element={<EnergyGenerator />} />
          <Route path="/data" element={<DataShowcase/>} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
