import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from '@heroicons/react/24/solid';
import { usePartner } from '../context/PartnerContext';
import { useUser } from '../context/UserContext';

const ResetPasswordAdmin = () => {
  const { partners, getPartnes, resetPassword } = usePartner();
  const { users, getUsers, resetPassword: resetPasswordUser } = useUser();
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedPartnerDni, setSelectedPartnerDni] = useState('');
  const [selectedAdminDni, setSelectedAdminDni] = useState('');

  // Fetch partners and users once on component mount
  useEffect(() => {
    getPartnes();
    getUsers();
  }, []);

  // Partner form management
  const {
    register: registerPartner,
    handleSubmit: handleSubmitPartner,
    formState: { errors: errorsPartner },
  } = useForm();

  // Admin form management
  const {
    register: registerAdmin,
    handleSubmit: handleSubmitAdmin,
    formState: { errors: errorsAdmin },
  } = useForm();

  // Function to open partner modal
  const handleOpenPartnerModal = (data) => {
    setSelectedPartnerDni(data.dni);
    setIsPartnerModalOpen(true);
  };

  // Function to open admin modal
  const handleOpenAdminModal = (data) => {
    setSelectedAdminDni(data.dniAdmin);
    setIsAdminModalOpen(true);
  };

  // Function to reset partner password
  const handleResetPassword = async () => {
    try {
      const success = await resetPassword({ dni: selectedPartnerDni });
      if (success) {
        toast.success('Contraseña del socio restablecida con éxito');
      } else {
        toast.error('Error al restablecer la contraseña del socio');
      }
    } catch (error) {
      toast.error('Error al restablecer la contraseña del socio');
    }
    setIsPartnerModalOpen(false);
  };

  // Function to reset admin password
  const handleResetAdminPassword = async () => {
    
    try {
      const success = await resetPasswordUser({ dni: selectedAdminDni });
      if (success) {
        toast.success('Contraseña del administrador restablecida con éxito');
      } else {
        toast.error('Error al restablecer la contraseña del administrador');
      }
    } catch (error) {
      toast.error('Error al restablecer la contraseña del administrador');
    }
    setIsAdminModalOpen(false);
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
        <form onSubmit={handleSubmitPartner(handleOpenPartnerModal)}>
          <div className="mb-4">
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700">Socio</label>
            <select id="dni" {...registerPartner('dni', { required: true })} className="border border-gray-300 p-2 rounded w-full text-sm">
              {partners.map(partner => (
                <option key={partner.dni} value={partner.dni}>{partner.name} {partner.lastname}</option>
              ))}
            </select>
            {errorsPartner.dni && <p className="text-red-500">El socio es requerido</p>}
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
              <button onClick={handleResetPassword} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Restablecer</button>
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
        <form onSubmit={handleSubmitAdmin(handleOpenAdminModal)}>
          <div className="mb-4">
            <label htmlFor="dniAdmin" className="block text-sm font-medium text-gray-700">Administrador</label>
            <select id="dniAdmin" {...registerAdmin('dniAdmin', { required: true })} className="border border-gray-300 p-2 rounded w-full text-sm">
              {users.map(admin => (
                <option key={admin.dni} value={admin.dni}>{admin.name} {admin.lastname}</option>
              ))}
            </select>
            {errorsAdmin.dniAdmin && <p className="text-red-500">El administrador es requerido</p>}
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
              <button onClick={handleResetAdminPassword} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Restablecer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordAdmin;
