import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'

interface IPiechart {
    available:number,
    reserved:number
}

const AnimatedDoughnutChart:React.FC<IPiechart> = ({available,reserved}) => {
  const [chartData, setChartData] = useState({
    labels: ['Unallocated','Reserved'],
    options: {
      plugins: {
        legend: {
          position: 'right',
        },
      },
      // responsive: true,
      // maintainAspectRatio: false,
    },
    datasets: [
      {
        data: [available,reserved],
        borderWidth:1,
        backgroundColor: ['rgba(120,120,188,0.6)','rgba(209,13,72,0.3)',],
        borderColor: ['rgba(120,120,188)','rgba(204,39,66)'],
      },
    ],
  });

  const animateChart = () => {
    setChartData({
      ...chartData,
      datasets: [
        {
          data: [available,reserved],
          borderWidth:1,
          backgroundColor: ['rgba(29, 207, 165,0.3)','rgba(120,120,188,0.6)'],
          borderColor: ['rgba(29, 207, 165)','rgba(120,120,188)',],
        },
      ]
    });
    setTimeout(() => {
        setChartData(chartData);
      }, 2000);
  };

  useEffect(() => {
    const animationInterval = setInterval(animateChart, 6000);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div>
      <Doughnut data={chartData} />
    </div>
  );
};

export default AnimatedDoughnutChart;


