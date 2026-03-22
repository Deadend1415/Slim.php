import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import slimLogo from "./assets/pngwing.com.png";
import "./App.css";
import { PieChart, LineChart } from "./Chart";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
        <img src={slimLogo} className="logo slim" alt="Slim logo" />
      </div>
      <h1>Slim.php + React.js Page</h1>
      <div className="chartWrapper">
        <div className="chartBox" style={{ gridArea: "1 / 1 / 2 / 3" }}>
          <LineChart />
        </div>
        <div className="chartBox">
          <PieChart />
        </div>
        <div className="chartBox">
          <PieChart />
        </div>
      </div>
      <div className="card">
        <button>Go to Home</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button>Go to Products</button>
        <br />
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
