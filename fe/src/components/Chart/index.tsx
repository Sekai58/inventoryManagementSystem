import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'
import {useSelector} from 'react-redux'

interface IPiechart {
    available:number,
    reserved:number
}



export const DoughnutChart:React.FC<IPiechart> = ({available,reserved}) => {
  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })
  
  const colorNeutral = theme?'rgba(120,120,188,0.3)':'rgba(120,120,188,0.7)'
  const colorReserved = theme?'rgba(209,13,72,0.3)':'rgba(209,13,72,0.7)'
  const colorAvailable = theme?'rgba(29, 207, 165,0.3)':'rgba(29, 207, 165,0.7)'
  // console.log("data",available,reserved)
 
  const [chartData, setChartData] = useState({
    // labels: ['Unallocated','Reserved'],
    options: {
      plugins: {
        legend: {
          position: 'right',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
    datasets: [
      {
        data: [available,reserved],
        borderWidth:1,
        // backgroundColor: ['rgba(120,120,188,0.6)','rgba(209,13,72,0.3)',],
        backgroundColor: [colorNeutral,colorReserved,],
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
          backgroundColor: [colorAvailable,colorNeutral],
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

//BarChart
export const BarChart = () => {

  const theme = useSelector((state:any)=>{
    return state.theme.dark
  })
  
  const colorReserved = theme?'rgba(209,13,72,0.3)':'rgba(209,13,72,0.7)'
  const colorAvailable = theme?'rgba(29, 207, 165,0.3)':'rgba(29, 207, 165,0.7)'

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Unallocated',
        data: [12, 19, 3, 5, 2],
        backgroundColor: colorAvailable,
        borderColor: 'rgba(29, 207, 165,1)',
        borderWidth: 1,
      },
      {
        label: 'Reserved',
        data: [4, 5, 3, 6, 10],
        backgroundColor: colorReserved, 
        borderColor: 'rgba(209,13,72,1)', 
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    // maintainAspectRatio: false, // Disable the default aspect ratio
    // responsive: true,
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

// export default BarChart;
