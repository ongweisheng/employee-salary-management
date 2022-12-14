import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import NavBar from "./components/NavBar.js"
import EmployeesDashboard from "./components/EmployeesDashboard.js"
import CreateEmployee from "./components/CreateEmployee.js"
import FindEmployee from "./components/FindEmployee.js"

function App() {
  return (
    <div className="d-grid gap-3">
      <NavBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<EmployeesDashboard />} />
          <Route exact path="/create" element={<CreateEmployee />} />
          <Route exact path="/find" element={<FindEmployee />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
