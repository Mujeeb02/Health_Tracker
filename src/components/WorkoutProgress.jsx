import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const WorkoutProgress = ({ user }) => {
  const chartRef = useRef(null);
  const myChartRef = useRef(null);

  useEffect(() => {
    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    myChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: user.workouts.map((workout, index) => `Workout ${index + 1}`),
        datasets: [{
          label: 'Workout Minutes',
          data: user.workouts.map(workout => workout.minutes),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: user.workouts.map((workout, index) => `Workout ${index + 1}`)
          },
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [user]);

  return <div className="relative h-96"><canvas ref={chartRef} /></div>;
};

export default WorkoutProgress;
