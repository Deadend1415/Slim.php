import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useState, useEffect } from "react";

export function PieChart() {
  const [foodJSON, setFoodJSON] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api")
      .then((res) => res.json())
      .then((data) => setFoodJSON(data));
  }, []);

  const label = foodJSON.map((item) => Object.values(item)[0]);
  const data = foodJSON.map((item) => Object.values(item)[1]);

  const chartData = {
    labels: label,
    datasets: [
      {
        label: "# of Foods",
        data: data,
        borderWidth: 1,
        backgroundColor: [
          "rgb(255, 99, 133)",
          "rgb(54, 163, 235)",
          "rgb(255, 207, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgba(255, 160, 64, 0.69)",
        ],
        borderColor: ["rgb(255, 255, 255)"],
      },
    ],
  };
  return <Pie data={chartData} />;
}
// Line chart
export function LineChart() {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 20, 60, 200, 10, 40, 65],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Dataset 2",
        data: [2, 30, 200, 100, 20, 50, 15],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
