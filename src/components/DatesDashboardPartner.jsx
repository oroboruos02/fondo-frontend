import React, { useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useAccount } from '../context/AccountContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend);

const DatesDashboardPartner = () => {

  const { getTotalInvestment, totalInvestment } = useAccount();

  // Currency formatter for Colombian Pesos
  const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  });

  const barData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Inversión Mensual',
        data: [5000, 7000, 8000, 6000, 7000, 9000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Rendimiento Mensual (%)',
        data: [5, 6, 7, 8, 5.5, 6.2],
        fill: false,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
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

  useEffect(() => {
    getTotalInvestment();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Panel del Socio</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Datos generales */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Resumen de Inversión</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Mi inversión total:</span>
              <span>{currencyFormatter.format(totalInvestment.totalInvestment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Mi Rendimiento Total:</span>
              <span>8%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Mis Fondos Activos:</span>
              <span>{currencyFormatter.format(50000)}</span>
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

export default DatesDashboardPartner;
