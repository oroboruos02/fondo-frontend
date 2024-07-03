import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { usePartner } from '../context/PartnerContext';
import { useAccount } from '../context/AccountContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TableAccount = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const { partners, getPartnes } = usePartner();
  const { accounts, getAccounts, registerAccount, errors: registerAccountErrors } = useAccount();
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);

  const [editingAccount, setEditingAccount] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleCreateAccount = (data) => {
    const partner = partners.find(p => p.dni === data.partnerId);
    const newData = {
      ...data,
      partner: partner ? { dni: partner.dni, name: partner.name, lastname: partner.lastname } : { dni: data.partnerId, name: '', lastname: '' },
      isActive: true  // Por defecto, las nuevas cuentas se consideran activas
    };
    setAccounts([...accounts, newData]);
    reset();
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = handleSubmit(async (data) => {
    const success = await registerAccount(data);
    if (success) {
      reset();
      setIsFormVisible(false);
    }
    setShouldFetchPartners(true);
  });

  useEffect(() => {
    if (shouldFetchPartners) {
      getAccounts();
      getPartnes();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners]);

  return (
    <div className="p-4">
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
              <th className="px-4 py-2 border">Activo</th> {/* Nueva columna */}
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
                <td className="border px-4 py-2">{account.isActive ? 'Sí' : 'No'}</td> {/* Corregido 'Sí' duplicado */}
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
    </div>
  );
};

export default TableAccount;
