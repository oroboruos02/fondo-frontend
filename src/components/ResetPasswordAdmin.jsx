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
  const { resetPassword } = usePartner();

  const onSubmit = async (id) => {
    try {
      // Replace with your API call to reset the password
      const success = await resetPassword(id);
      if(success){
        toast.success('Contraseña restablecida con éxito');
      }
    } catch (error) {
      toast.error('Error al restablecer la contraseña');
    }
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
        <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">
                Socio
              </label>
              <select
                id="dni"
                name="dni"
                {...register('dni', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
              >
                {
                  partners.map(partner => (
                    <option key={partner.dni} value={partner.dni}>{partner.name} {partner.lastname}</option>
                  ))
                }
              </select>
              {errors.partnerId && <p className='text-red-500'>El socio es requerido</p>}
        </div>
        <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">Restablecer Contraseña</button>
      </form>
    </div>
  );
};

export default ResetPasswordAdmin;
