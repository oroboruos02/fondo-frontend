/* eslint-disable react-hooks/exhaustive-deps */
// src/components/LoginForm.jsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthPartner } from '../context/AuthPartnerContext';

export default function LoginClient() {
 
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: siginErrors, isAuthenticatedPartner } = useAuthPartner();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(data => {
    signin(data);
  });

  useEffect(() => {
    if(isAuthenticatedPartner) navigate('/dashboard-partner')
  }, [isAuthenticatedPartner])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="./fondo.png"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
        </div>
        {
          siginErrors.map((error, i) => (
            <p className='text-red-500' key={i}>{error}</p>
          ))
        }
        <form className="mt-8 space-y-6" onSubmit={ onSubmit }>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                {...register("email", { required: true })}
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingrese su correo electrónico"
              />
              {errors.email && <p className='text-red-500'>El correo electrónico es requerido</p>}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                {...register("password", { required: true })}
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Ingrese su contraseña"
              />
              {errors.password && <p className='text-red-500'>La contraseña es requerida</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}