import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, options]);

  return (
    <canvas ref={chartRef} width="100px" height="100px"></canvas>
  );
};

export default BarChart;
