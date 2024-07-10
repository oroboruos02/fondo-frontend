import React from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from '@heroicons/react/24/solid';
import { usePartner } from '../context/PartnerContext';

const DataFormPartner = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { changePassword, errors: changePasswordErrors  } = usePartner();

  const onSubmit = async (data) => {
    try {
      // Replace with your API call to change the password
      const success = await changePassword(data)
      if(success){
        toast.success('Contraseña cambiada con éxito');
        reset();
      }
    } catch (error) {
      toast.error('Error al cambiar la contraseña');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <ToastContainer />
      <div className="flex items-center mb-4">
        <KeyIcon className="h-6 w-6 text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold">Cambiar Contraseña</h2>
      </div>
      {changePasswordErrors.map((error, i) => (
            <p className="text-red-500" key={i}>{error}</p>
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'La contraseña actual es requerida' })}
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
