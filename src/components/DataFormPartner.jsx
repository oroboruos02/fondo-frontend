import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from '@heroicons/react/24/solid';

const DataFormPartner = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Replace with your API call to change the password
      const response = await fakeApiChangePassword(data.currentPassword, data.newPassword);
      toast.success('Contraseña cambiada con éxito');
    } catch (error) {
      toast.error('Error al cambiar la contraseña');
    }
  };

  // Fake API call function to simulate password change
  const fakeApiChangePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (currentPassword === 'correct-password') {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <ToastContainer />
      <div className="flex items-center mb-4">
        <KeyIcon className="h-6 w-6 text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold">Cambiar Contraseña</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
          <input
            id="currentPassword"
            type="password"
            {...register('currentPassword', { required: 'La contraseña actual es requerida' })}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          />
          {errors.currentPassword && <p className="text-red-500">{errors.currentPassword.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword', { required: 'La nueva contraseña es requerida' })}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          />
          {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}
        </div>
        <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">Cambiar contraseña</button>
      </form>
    </div>
  );
};

export default DataFormPartner;
