import './App.css'
import NavBar from "./components/NavBar.js"
import EmployeesDashboard from "./components/EmployeesDashboard.js"

function App() {
  return (
    <div className="d-grid gap-3">
      <NavBar />
      <EmployeesDashboard />
    </div>
  );
}

export default App;
