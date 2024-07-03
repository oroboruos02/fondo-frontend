import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const ReportsPartner = () => {
  const barData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Inversión Mensual',
        data: [4500, 4800, 5000, 5200, 5300, 5500],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Rendimiento Mensual (%)',
        data: [4.5, 5.2, 5.8, 6.0, 6.3, 6.5],
        fill: false,
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inversión y Rendimiento Mensual',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Reportes del Socio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos generales */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Resumen de Reportes</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Invertido:</span>
              <span>$30,000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Rendimiento Total:</span>
              <span>6.5%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fondos Activos:</span>
              <span>$30,000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Número de Transacciones:</span>
              <span>15</span>
            </div>
          </div>
        </div>
        {/* Gráficos */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Bar data={barData} options={options} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ReportsPartner;