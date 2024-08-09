import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from '@heroicons/react/24/solid';
import { useUser } from '../context/UserContext';

const DataFormAdmin = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [isEditing, setIsEditing] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [shouldFetchUser, setShouldFetchUser] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [passwordData, setPasswordData] = useState(null); // Store password data for confirmation

  const formRef = useRef(null);
  const { getProfileUser, changePassword, errors: changePasswordErrors } = useUser();

  const onSubmitPassword = async () => {
    try {
      const success = await changePassword(passwordData);
      if (success) {
        toast.success('Contraseña cambiada con éxito');
        reset();
      }
    } catch (error) {
      toast.error('Error al cambiar la contraseña');
    }
    setIsModalOpen(false);
  };

  const handleEditClick = (field) => {
    setIsEditing(field);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsEditing('');
  };

  const handleOpenModal = (data) => {
    setPasswordData(data);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (shouldFetchUser) {
      getProfileUser();
      setShouldFetchUser(false);
    }
  }, [shouldFetchUser, getProfileUser]);

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-8">
      <ToastContainer />

      {/* Formulario de cambio de contraseña */}
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="flex items-center mb-4">
          <KeyIcon className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-lg font-semibold">Cambiar Contraseña</h2>
        </div>
        {changePasswordErrors && changePasswordErrors.map((error, i) => (
          <p className="text-red-500" key={i}>{error}</p>
        ))}
        <form onSubmit={handleSubmit(handleOpenModal)}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'La contraseña actual es requerida' })}
              className="border border-gray-300 p-2 rounded w-full text-sm"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Cambio de Contraseña</h2>
            <p className="mb-4">¿Está seguro de que desea cambiar su contraseña?</p>
            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancelar</button>
              <button onClick={onSubmitPassword} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFormAdmin;
