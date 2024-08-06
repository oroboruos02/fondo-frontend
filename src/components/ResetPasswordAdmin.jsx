import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from '@heroicons/react/24/solid';
import { usePartner } from '../context/PartnerContext';

const ResetPasswordAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { partners, getPartnes, resetPassword } = usePartner();
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedDni, setSelectedDni] = useState('');

  useEffect(() => {
    if (shouldFetchPartners) {
      getPartnes();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners, getPartnes]);

  const handleOpenModal = (data, type) => {
    setSelectedDni(data.dni);
    if (type === 'partner') {
      setIsPartnerModalOpen(true);
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const handleResetPassword = async (type) => {
    try {
      const success = await resetPassword({ dni: selectedDni });
      if (success) {
        toast.success(`Contraseña ${type === 'partner' ? 'del socio' : 'del administrador'} restablecida con éxito`);
      } else {
        toast.error(`Error al restablecer la contraseña ${type === 'partner' ? 'del socio' : 'del administrador'}`);
      }
    } catch (error) {
      toast.error(`Error al restablecer la contraseña ${type === 'partner' ? 'del socio' : 'del administrador'}`);
    }
    if (type === 'partner') {
      setIsPartnerModalOpen(false);
    } else {
      setIsAdminModalOpen(false);
    }
  };

  return (
    <div>
      <ToastContainer />

      {/* Formulario para socios */}
      <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
        <div className="flex items-center mb-4">
          <KeyIcon className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-lg font-semibold">Restablecer Contraseña de Socios</h2>
        </div>
        <form onSubmit={handleSubmit(data => handleOpenModal(data, 'partner'))}>
          <div className="mb-4">
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">Socio</label>
            <select id="dni" name="dni" {...register('dni', { required: true })} className="border border-gray-300 p-2 rounded w-full text-sm">
              {partners.map(partner => (
                <option key={partner.dni} value={partner.dni}>{partner.name} {partner.lastname}</option>
              ))}
            </select>
            {errors.dni && <p className="text-red-500">El socio es requerido</p>}
          </div>
          <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">Restablecer Contraseña</button>
        </form>
      </div>

      {isPartnerModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Restablecimiento de Contraseña del Socio</h2>
            <p className="mb-4">¿Está seguro de que desea restablecer la contraseña del socio seleccionado?</p>
            <div className="flex justify-end">
              <button onClick={() => setIsPartnerModalOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancelar</button>
              <button onClick={() => handleResetPassword('partner')} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Restablecer</button>
            </div>
          </div>
        </div>
      )}

      {/* Formulario para administradores */}
      <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md mt-8">
        <div className="flex items-center mb-4">
          <KeyIcon className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-lg font-semibold">Restablecer Contraseña de Administradores</h2>
        </div>
        <form onSubmit={handleSubmit(data => handleOpenModal(data, 'admin'))}>
          <div className="mb-4">
            <label htmlFor="dniAdmin" className="block text-sm font-medium text-gray-700">Administrador</label>
            <select id="dniAdmin" name="dniAdmin" {...register('dniAdmin', { required: true })} className="border border-gray-300 p-2 rounded w-full text-sm">
              {partners.map(partner => (
                <option key={partner.dni} value={partner.dni}>{partner.name} {partner.lastname}</option>
              ))}
            </select>
            {errors.dniAdmin && <p className="text-red-500">El administrador es requerido</p>}
          </div>
          <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">Restablecer Contraseña</button>
        </form>
      </div>

      {isAdminModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Restablecimiento de Contraseña del Administrador</h2>
            <p className="mb-4">¿Está seguro de que desea restablecer la contraseña del administrador seleccionado?</p>
            <div className="flex justify-end">
              <button onClick={() => setIsAdminModalOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">Cancelar</button>
              <button onClick={() => handleResetPassword('admin')} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Restablecer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordAdmin;
