import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-4xl font-bold mb-4 text-center">Error 404 - Página no encontrada</h2>
      <p className="text-lg text-gray-600 mb-8 text-center">La página que estás buscando no ha sido encontrada.</p>
      <Link
        to="/"
        className="bg-black hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Ir a Inicio
      </Link>
    </div>
  );
};

export default NotFound;