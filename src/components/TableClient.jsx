import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { usePartner } from '../context/PartnerContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableClientes = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { partners, getPartnes, setPartners, registerPartner, errors: registerPartnerErrors, disablePartner } = usePartner();
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCliente] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const formRef = useRef(null); // Referencia al formulario

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

  const handleDeleteCliente = async () => {
    const success = await disablePartner(selectedClientId);
    if(success) {
      setIsDeleteModalOpen(false);
      toast.success('Socio desactivado con éxito');
      setShouldFetchPartners(true);
    }
  };

  const openDeleteModal = (clientId) => {
    setSelectedClientId(clientId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      scrollFormIntoView(); // Llamar a la función para hacer scroll al formulario
    }
  };

  const onSubmit = handleSubmit(async (partner) => {
    if (editingCliente !== null) {
      // Actualizar el socio existente
      // Aquí puedes implementar la lógica de actualización del socio
      console.log(partner);
      reset();
    } else {
      const success = await registerPartner(partner);
      if (success) {
        toast.success('Socio creado con éxito');
        reset();
        setShouldFetchPartners(true);
      }
    }
  });

  const scrollFormIntoView = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (shouldFetchPartners) {
      getPartnes();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners, getPartnes]);

  const clientesPerPage = 10;
  const totalPages = Math.ceil(filteredClientes.length / clientesPerPage);
  const displayedClientes = filteredClientes.slice((currentPage - 1) * clientesPerPage, currentPage * clientesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
          {isFormVisible ? 'Cancelar' : 'Crear socio'}
        </button>
        <input
          type="text"
          placeholder="Buscar por cédula o nombre"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded text-sm"
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
            {displayedClientes.map((partner, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-sm">{partner.dni}</td>
                <td className="border px-4 py-2 text-sm">{partner.name}</td>
                <td className="border px-4 py-2 text-sm">{partner.lastname}</td>
                <td className="border px-4 py-2 text-sm">{partner.phoneNumber}</td>
                <td className="border px-4 py-2 text-sm">{partner.email}</td>
                <td className="border px-4 py-2 text-sm">{partner.address}</td>
                <td className="border px-4 py-2 text-sm">
                  {partner.isActive && (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button onClick={() => openDeleteModal(partner.dni)} className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition duration-300 ease-in-out">
                      Desactivar
                    </button>
                  </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            className={`bg-black text-white px-4 py-2 rounded text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className={`bg-black text-white px-4 py-2 rounded text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
        <div className="text-center mt-2">
          Página {currentPage} de {totalPages}
        </div>
      </div>
      <div ref={formRef} /> {/* Referencia al formulario para hacer scroll */}
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 ">{editingCliente !== null ? 'Editar Socio' : 'Agregar Nuevo Socio'}</h2>
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
                  className="border border-gray-300 p-2 rounded w-full text-sm"
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
                  className="border border-gray-300 p-2 rounded w-full text-sm"
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
                  className="border border-gray-300 p-2 rounded w-full text-sm"
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
                  className="border border-gray-300 p-2 rounded w-full text-sm"
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
                  className="border border-gray-300 p-2 rounded w-full text-sm"
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
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.address && <p className="text-red-500">La dirección es requerida</p>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              {editingCliente !== null ? 'Actualizar' : 'Crear'}
            </button>
          </form>
        </div>
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas desactivar este socio?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteCliente}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Desactivar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableClientes;
