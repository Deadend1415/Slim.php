import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const options = {
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

function App() {
  const [count, setCount] = useState(0);
  const [foodJSON, setFoodJSON] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api")
      .then((res) => res.json())
      .then((data) => setFoodJSON(data));
  }, []);

  console.log(foodJSON);

  const chartData = {
    labels: "Object.keys(items)",
    datasets: [
      {
        label: "# of Foods",
        data: "Object.values(items)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Welcome to My Slim.php + React.js Page</h1>
      <div className="card">
        <button>Go to Home</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button>Go to Products</button>
        <br />
        <div>
          <Bar data={chartData} options={options} />
        </div>
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
