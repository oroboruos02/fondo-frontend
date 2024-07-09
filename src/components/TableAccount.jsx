import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePartner } from '../context/PartnerContext';
import { useAccount } from '../context/AccountContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

dayjs.extend(utc);

const TableAccount = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const { partners, getPartnes } = usePartner();
  const { accounts, getAccounts, registerAccount, errors: registerAccountErrors, disableAccount } = useAccount();
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter((account) => {
    const partnerId = account.partner.dni ? account.partner.dni.toString().toLowerCase() : '';
    const partnerName = account.partner.name && account.partner.lastname 
      ? `${account.partner.name.toLowerCase()} ${account.partner.lastname.toLowerCase()}` 
      : '';
    return (
      partnerId.includes(searchTerm.toLowerCase()) ||
      partnerName.includes(searchTerm.toLowerCase())
    );
  });

  const handleCreateAccount = async (data) => {
    const partner = partners.find(p => p.dni === data.partnerId);
    const newData = {
      ...data,
      partner: partner ? { dni: partner.dni, name: partner.name, lastname: partner.lastname } : { dni: data.partnerId, name: '', lastname: '' },
      isActive: true  // Por defecto, las nuevas cuentas se consideran activas
    };
    const success = await registerAccount(newData);
    if (success) {
      toast.success('Cuenta creada con éxito');
      getAccounts(); // Recargar las cuentas
      reset();
      setIsFormVisible(false);
    } else {
      toast.error('Error al crear la cuenta');
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = handleSubmit(handleCreateAccount);

  const handleDeactivate = async () => {
    const success = await disableAccount(selectedAccountId);
    if (success) {
      toast.success('Cuenta desactivada con éxito');
      getAccounts(); // Recargar las cuentas
    } else {
      toast.error('Error al desactivar la cuenta');
    }
    closeModal();
  };

  const openModal = (accountId) => {
    setSelectedAccountId(accountId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccountId(null);
  };

  useEffect(() => {
    if (shouldFetchPartners) {
      getAccounts();
      getPartnes();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners]);

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear cuenta'}
        </button>
        <input
          type="text"
          placeholder="Buscar por cédula socio o nombre del socio"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID Cuenta</th>
              <th className="px-4 py-2 border">Cédula Socio</th>
              <th className="px-4 py-2 border">Nombre del Socio</th>
              <th className="px-4 py-2 border">Cuotas</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Total Inscripción</th>
              <th className="px-4 py-2 border">Fecha de Apertura</th>
              <th className="px-4 py-2 border">Pagos</th>
              <th className="px-4 py-2 border">Activo</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{account.id}</td>
                <td className="border px-4 py-2">{account.partner.dni}</td>
                <td className="border px-4 py-2">{account.partner.name} {account.partner.lastname}</td>
                <td className="border px-4 py-2">{account.quotas}</td>
                <td className="border px-4 py-2">{account.value}</td>
                <td className="border px-4 py-2">{account.initialInvestment}</td>
                <td className="border px-4 py-2">{dayjs(account.openingDate).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2">{account.myPayments}</td>
                <td className="border px-4 py-2">{account.isActive ? 'Sí' : 'No'}</td>
                <td className="border px-4 py-2">
                  {account.isActive && (
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
                      onClick={() => openModal(account.id)}
                    >
                      Desactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Agregar Nueva Cuenta</h2>
          {registerAccountErrors.map((error, i) => (
            <p className='text-red-500' key={i}>{error}</p>
          ))}
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">
                Socio
              </label>
              <select
                id="partnerId"
                name="partnerId"
                {...register('partnerId', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                {
                  partners.map(partner => (
                    <option key={partner.dni} value={partner.dni}>{partner.name} {partner.lastname}</option>
                  ))
                }
              </select>
              {errors.partnerId && <p className='text-red-500'>El socio es requerido</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="partnerType" className="block text-sm font-medium text-gray-700">
                Tipo de Socio
              </label>
              <select
                id="partnerType"
                name="partnerType"
                {...register('partnerType', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="new">Nuevo</option>
                <option value="old">Antiguo</option>
              </select>
              {errors.partnerType && <p className='text-red-500'>El tipo de socio es requerido</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="quotas" className="block text-sm font-medium text-gray-700">
                Número de Cuotas
              </label>
              <input
                id="quotas"
                type='number'
                name="quotas"
                {...register('quotas', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.quotas && <p className='text-red-500'>El número de cuotas es requerido</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="openingDate" className="block text-sm font-medium text-gray-700">
                Fecha de Apertura
              </label>
              <input
                id="openingDate"
                type="date"
                name="openingDate"
                {...register('openingDate', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {errors.openingDate && <p className='text-red-500'>La fecha de apertura es requerida</p>}
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Desactivación"
        className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Confirmar Desactivación</h2>
          <p className="mb-4">¿Está seguro de que desea desactivar esta cuenta?</p>
          <div className="flex justify-end">
            <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">
              Cancelar
            </button>
            <button onClick={handleDeactivate} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
              Desactivar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TableAccount;
