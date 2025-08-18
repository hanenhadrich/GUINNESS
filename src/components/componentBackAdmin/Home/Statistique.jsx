import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import dayjs from "dayjs";

export default function Statistique() {
  const subscriptions = useSelector((state) => state.subscriptions.list);
  const adherents = useSelector((state) => state.adherents.list);

  const barChartRef = useRef(null); 
  const lineChartRef = useRef(null); 

  const getMonthlyCounts = (items, dateField) => {
    const counts = Array(12).fill(0);
    items.forEach((item) => {
      if (item[dateField]) {
        const month = dayjs(item[dateField]).month();
        counts[month]++;
      }
    });
    return counts;
  };

  useEffect(() => {
    const labels = [
      "Jan","Fév","Mar","Avr","Mai","Juin",
      "Juil","Août","Sep","Oct","Nov","Déc",
    ];
    const subscriptionsData = getMonthlyCounts(subscriptions, "startDate");
    const adherentsData = getMonthlyCounts(adherents, "createdAt");

    // Graphique à barres
    const barChart = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Abonnements par mois",
            data: subscriptionsData,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderRadius: 6,
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Abonnements par mois",
            font: { size: 18, weight: "bold" },
            color: "#444",
            padding: { top: 10, bottom: 20 },
          },
          legend: {
            labels: { font: { size: 14 }, color: "#555" },
          },
        },
        scales: {
          x: { grid: { display: false } },
          y: { ticks: { color: "#555" } },
        },
        animation: { duration: 800, easing: "easeOutQuad" },
      },
    });

    // Graphique linéaire
    const lineChart = new Chart(lineChartRef.current, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Adhérents par mois",
            data: adherentsData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointBackgroundColor: "white",
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Adhérents ajoutés par mois",
            font: { size: 18, weight: "bold" },
            color: "#444",
            padding: { top: 10, bottom: 20 },
          },
          legend: {
            labels: { font: { size: 14 }, color: "#555" },
          },
        },
        scales: {
          x: { grid: { color: "#eee" } },
          y: { ticks: { color: "#555" } },
        },
        animation: { duration: 800, easing: "easeOutQuad" },
      },
    });

    return () => {
      barChart.destroy();
      lineChart.destroy();
    };
  }, [subscriptions, adherents]);

  return (
    <div className="row g-4 p-3">
      <div className="col-xl-6 col-md-12">
        <div className="card shadow-sm border-0 rounded-3 p-3">
          <canvas ref={barChartRef} style={{ height: "320px" }}></canvas>
        </div>
      </div>
      <div className="col-xl-6 col-md-12">
        <div className="card shadow-sm border-0 rounded-3 p-3">
          <canvas ref={lineChartRef} style={{ height: "320px" }}></canvas>
        </div>
      </div>
    </div>
  );
}
