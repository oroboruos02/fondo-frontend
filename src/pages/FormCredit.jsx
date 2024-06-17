import React, { useState } from 'react';

const FormCredit = () => {
  const [formData, setFormData] = useState({
    amount: '',
    duration: '',
    occupation: '',
  });
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const themeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';
  const inputClass = darkMode
    ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500'
    : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500';

  return (
    <div className={`flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${themeClass}`}>
      <button
        className="absolute top-4 right-4 focus:outline-none"
        onClick={toggleDarkMode}
      >
        {darkMode ? (
          <svg
            className="w-8 h-8 text-yellow-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        ) : (
          <svg
            className="w-8 h-8 text-yellow-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
          </svg>
        )}
      </button>
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <img
            className="h-12 w-auto"
            src="./fondo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            Solicitud de Crédito
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div className="mb-4">
              <label htmlFor="amount" className="sr-only">
                Monto a solicitar
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 ${inputClass}`}
                placeholder="Monto a solicitar"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="sr-only">
                Duración del crédito
              </label>
              <input
                id="duration"
                name="duration"
                type="text"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 ${inputClass}`}
                placeholder="Duración del crédito (en meses)"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="occupation" className="sr-only">
                Ocupación
              </label>
              <input
                id="occupation"
                name="occupation"
                type="text"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 ${inputClass}`}
                placeholder="Ocupación"
                value={formData.occupation}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-yellow-500 py-2 px-4 text-sm font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCredit;