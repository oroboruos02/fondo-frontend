import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon, PencilIcon } from '@heroicons/react/24/solid';
import { usePartner } from '../context/PartnerContext';

const DataFormPartner = () => {
  // Formularios de cambio de contraseña y edición de contacto
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: { errors: emailErrors }, reset: resetEmail } = useForm();
  const { register: registerPhone, handleSubmit: handleSubmitPhone, formState: { errors: phoneErrors }, reset: resetPhone } = useForm();
  const { register: registerAddress, handleSubmit: handleSubmitAddress, formState: { errors: addressErrors }, reset: resetAddress } = useForm();
  
  const [isEditing, setIsEditing] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [shouldFetchPartner, setShouldFetchPartner] = useState(true);
  const formRef = useRef(null);
  const { partner, getProfilePartner, changeEmail, changePhone, changeAddress, changePassword, errors: changePasswordErrors, editErrors: changeInfoErrors } = usePartner();

  const onSubmitPassword = async (data) => {
    try {
      const success = await changePassword(data);
      if (success) {
        toast.success('Contraseña cambiada con éxito');
        reset();
      }
    } catch (error) {
      toast.error('Error al cambiar la contraseña');
    }
  };

  const onSubmitEmail = async (email) => {
    try {
      const success = await changeEmail(email);
      setShouldFetchPartner(true);
      if(success) {
        toast.success('Correo electrónico actualizado con éxito');
        resetEmail();
      }
    } catch (error) {
      toast.error('Error al actualizar el correo electrónico');
    }
  };

  const onSubmitPhone = async (phone) => {
    try {
      const success = await changePhone(phone);
      setShouldFetchPartner(true);
      if(success) {
        toast.success('Número telefónico actualizado con éxito');
        resetPhone();
      }
    } catch (error) {
      toast.error('Error al actualizar el número telefónico');
    }
  };

  const onSubmitAddress = async (address) => {
    try {
      const success = await changeAddress(address);
      setShouldFetchPartner(true);
      if(success) {
        toast.success('Dirección actualizada con éxito');
        resetAddress();
      }
    } catch (error) {
      toast.error('Error al actualizar la dirección');
    }
  };

  const handleEditClick = (field) => {
    setIsEditing(field);
    setIsFormVisible(true);
    //formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setIsEditing('');
  };

  useEffect(() => {
    if(shouldFetchPartner){
      getProfilePartner();
      setShouldFetchPartner(false)
    }
  }, [shouldFetchPartner, getProfilePartner])

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
        <form onSubmit={handleSubmit(onSubmitPassword)}>
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
      {/* Sección de información de contacto */}
      <div className="flex-1 bg-white shadow-md rounded-md p-4">
        <div className="flex items-center mb-4">
          <PencilIcon className="h-6 w-6 text-gray-700 mr-2" />
          <h2 className="text-lg font-semibold">Información de Contacto</h2>
        </div>

        {/* Sección de visualización */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <button
              type="button"
              onClick={() => handleEditClick('email')}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Editar
            </button>
          </div>
          <input
            id='email'
            type="email"
            disabled
            {...register('email')}
            value={partner.email}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <button
              type="button"
              onClick={() => handleEditClick('Número Telefónico')}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Editar
            </button>
          </div>
          <input
            type="text"
            disabled
            {...register('phone')}
            value={partner.phoneNumber}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Dirección</label>
            <button
              type="button"
              onClick={() => handleEditClick('address')}
              className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Editar
            </button>
          </div>
          <input
            type="text"
            disabled
            {...register('address')}
            value={partner.address}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          />
        </div>
        {
          changeInfoErrors.map((error, i) => (
            <p className='text-red-500' key={i}>{error}</p>
          ))
        }
        {/* Formularios de edición */}
        {isFormVisible && (
          <div ref={formRef} className="mt-4 p-4 border rounded bg-gray-100">
            <h3 className="text-lg font-semibold mb-2">{isEditing ? `Editar ${isEditing.charAt(0).toUpperCase() + isEditing.slice(1)}` : ''}</h3>
            
            {/* Formulario de edición de correo electrónico */}
            {isEditing === 'email' && (
              <form onSubmit={handleSubmitEmail(onSubmitEmail)} className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Correo Electrónico</label>
                <input
                  type="text"
                  {...registerEmail('email', { required: 'El correo electrónico es requerido' })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {emailErrors.email && <p className='text-red-500'>{emailErrors.email.message}</p>}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </form>
            )}

            {/* Formulario de edición de teléfono */}
            {isEditing === 'Número Telefónico' && (
              <form onSubmit={handleSubmitPhone(onSubmitPhone)} className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Teléfono</label>
                <input
                  type="text"
                  {...registerPhone('phoneNumber', { required: 'El teléfono es requerido' })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {phoneErrors.phone && <p className='text-red-500'>{phoneErrors.phone.message}</p>}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </form>
            )}

            {/* Formulario de edición de dirección */}
            {isEditing === 'address' && (
              <form onSubmit={handleSubmitAddress(onSubmitAddress)} className="mb-4">
                <label className="block mb-2 text-sm font-bold text-gray-700">Dirección</label>
                <input
                  type="text"
                  {...registerAddress('address', { required: 'La dirección es requerida' })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {addressErrors.address && <p className='text-red-500'>{addressErrors.address.message}</p>}
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataFormPartner;
