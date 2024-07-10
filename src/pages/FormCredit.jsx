import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormCredit = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const onSubmit = (data) => {
    // Handle form submission logic here
    console.log(data);
    toast.success('Formulario enviado exitosamente!');
  };

  const themeClass = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800';
  const inputClass = darkMode
    ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500'
    : 'bg-white border-gray-300 placeholder-gray-500 text-gray-900 focus:ring-yellow-500 focus:border-yellow-500';

  return (
    <div className={`flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${themeClass}`}>
      <ToastContainer />
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
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                {...register('amount', { required: true })}
              />
              {errors.amount && <p className="text-red-500 text-sm">Este campo es requerido</p>}
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
                {...register('duration', { required: true })}
              />
              {errors.duration && <p className="text-red-500 text-sm">Este campo es requerido</p>}
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
                {...register('occupation', { required: true })}
              />
              {errors.occupation && <p className="text-red-500 text-sm">Este campo es requerido</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="sr-only">
                Celular
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 ${inputClass}`}
                placeholder="Celular"
                {...register('phone', { required: true })}
              />
              {errors.phone && <p className="text-red-500 text-sm">Este campo es requerido</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">
                Dirección de correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`relative block w-full appearance-none rounded-md border px-3 py-2 ${inputClass}`}
                placeholder="Dirección de correo"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-red-500 text-sm">Este campo es requerido</p>}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
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
