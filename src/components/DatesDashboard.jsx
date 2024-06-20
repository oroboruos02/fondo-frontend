import React from 'react';
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DatesDashboard = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Fondos',
        data: [12000, 15000, 8000, 18000, 20000, 22000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: 'Fondos de Inversión Mensuales',
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel del Administrador</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos generales */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Datos Generales</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Invertido:</span>
              <span>$130,000,000</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total de Inversionistas:</span>
              <span>50</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Fondos Activos:</span>
              <span>$80,000,000</span>
            </div>
          </div>
        </div>
        {/* Gráfico */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DatesDashboard;