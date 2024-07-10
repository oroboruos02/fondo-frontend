import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KeyIcon } from '@heroicons/react/24/solid';
import { usePartner } from '../context/PartnerContext';

const ResetPasswordAdmin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { partners, getPartnes } = usePartner();
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);

  const onSubmit = async (data) => {
    try {
      // Replace with your API call to reset the password
      const response = await fakeApiResetPassword(data.partnerId);
      toast.success('Contraseña restablecida con éxito');
    } catch (error) {
      toast.error('Error al restablecer la contraseña');
    }
  };

  // Fake API call function to simulate password reset
  const fakeApiResetPassword = (partnerId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (partnerId) {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    });
  };

  useEffect(() => {
    if (shouldFetchPartners) {
      getPartnes();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners, getPartnes]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <ToastContainer />
      <div className="flex items-center mb-4">
        <KeyIcon className="h-6 w-6 text-gray-700 mr-2" />
        <h2 className="text-lg font-semibold">Restablecer Contraseña de Socios</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">Seleccione Socio</label>
          <input
            list="partners"
            id="partnerId"
            {...register('partnerId', { required: 'El socio es requerido' })}
            className="border border-gray-300 p-2 rounded w-full text-sm"
          />
          <datalist id="partners">
            {(partners || []).map((partner) => ( // Asegúrate de que partners sea siempre un array
              <option key={partner.dni} value={partner.dni}>{partner.name} {partner.lastname}</option>
            ))}
          </datalist>
          {errors.partnerId && <p className="text-red-500">{errors.partnerId.message}</p>}
        </div>
        <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordAdmin;
