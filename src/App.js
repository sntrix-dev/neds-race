import logo from "./logo.svg";
import "./App.css";
import HomeScreen from "./screens/home";
import DetailsScreen from "./screens/details";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/details/:id" element={<DetailsScreen />} />
    </Routes>
  );
}

export default App;
