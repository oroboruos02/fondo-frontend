/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePartner } from '../context/PartnerContext';

const TableClientes = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const { partners, getPartnes, setPartners, registerPartner, errors: registerPartnerErrors } = usePartner();
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCliente, setEditingCliente] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClientes = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.phoneNumber.includes(searchTerm) ||
      partner.dni.includes(searchTerm)
  );

  const handleEditCliente = (index) => {
    const clienteToEdit = partners[index];
    setValue('dni', clienteToEdit.dni);
    setValue('name', clienteToEdit.name);
    setValue('lastname', clienteToEdit.lastname);
    setValue('phoneNumber', clienteToEdit.phoneNumber);
    setValue('email', clienteToEdit.email);
    setValue('address', clienteToEdit.address);
    setEditingCliente(index);
    setIsFormVisible(true);
  };

  const handleDeleteCliente = (index) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = handleSubmit(async (partner) => {
    if (editingCliente !== null) {
      console.log(partner);
      reset();
    } else {
      const success = await registerPartner(partner);
      success ? reset() : '';
      setShouldFetchPartners(true);
    }
  });

  useEffect(() => {
    if (shouldFetchPartners) {
      getPartnes();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners, partners]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear socio'}
        </button>
        <input
          type="text"
          placeholder="Buscar por cédula o nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Cédula</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellidos</th>
              <th className="px-4 py-2 border">Teléfono</th>
              <th className="px-4 py-2 border">Correo</th>
              <th className="px-4 py-2 border">Dirección</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((partner, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{partner.dni}</td>
                <td className="border px-4 py-2">{partner.name}</td>
                <td className="border px-4 py-2">{partner.lastname}</td>
                <td className="border px-4 py-2">{partner.phoneNumber}</td>
                <td className="border px-4 py-2">{partner.email}</td>
                <td className="border px-4 py-2">{partner.address}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditCliente(index)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCliente(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">{editingCliente !== null ? 'Editar Socio' : 'Agregar Nuevo Socio'}</h2>
          {registerPartnerErrors.map((error, i) => (
            <p className="text-red-500" key={i}>{error}</p>
          ))}
          <form onSubmit={onSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  {...register('dni', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                  disabled={editingCliente !== null}
                />
                {errors.dni && <p className="text-red-500">La cédula es requerida</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register('name', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.name && <p className="text-red-500">El nombre es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  {...register('lastname', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.lastname && <p className="text-red-500">Los apellidos son requeridos</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  {...register('phoneNumber', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.phoneNumber && <p className="text-red-500">El número telefónico es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register('email', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.email && <p className="text-red-500">El correo electrónico es requerido</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  {...register('address', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.address && <p className="text-red-500">La dirección es requerida</p>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              {editingCliente !== null ? 'Actualizar' : 'Crear'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TableClientes;