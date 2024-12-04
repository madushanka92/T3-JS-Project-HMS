import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, options }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [data, options]);

  return (
    <canvas ref={chartRef} style={{ width: "100%", height: "400px" }}></canvas>
  );
};

export default LineChart;
