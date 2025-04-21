import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import dayjs from 'dayjs';

export default function Statistique() {
  const areaChartRef = useRef(null);
  const barChartRef = useRef(null);

  const { list: reservations } = useSelector((state) => state.reservations);
  const { list: todos } = useSelector((state) => state.todos);

  const getMonthlyCounts = (items) => {
    const counts = Array(12).fill(0);
    items.forEach((item) => {
      if (item.createdAt) {
        const month = dayjs(item.createdAt).month(); // 0 = janvier, 11 = décembre
        counts[month]++;
      }
    });
    return counts;
  };

  useEffect(() => {
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const reservationData = getMonthlyCounts(reservations);
    const todoData = getMonthlyCounts(todos);

    const areaChart = new Chart(areaChartRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Réservations par mois',
          data: reservationData,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    const barChart = new Chart(barChartRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Tâches par mois',
          data: todoData,
          backgroundColor: 'rgba(153,102,255,0.6)',
          borderColor: 'rgba(153,102,255,1)',
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      areaChart.destroy();
      barChart.destroy();
    };
  }, [reservations, todos]);

  return (
    <div className="row">
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className="card-header">
            📊 Statistiques Tâches (par mois)
          </div>
          <div className="card-body" style={{ height: '300px' }}>
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>
      </div>  
      <div className="col-xl-6">
        <div className="card mb-4">
          <div className="card-header">
            📈 Statistiques Réservations (par mois)
          </div>
          <div className="card-body" style={{ height: '300px' }}>
            <canvas ref={areaChartRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
