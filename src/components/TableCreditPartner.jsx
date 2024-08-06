import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePartner } from '../context/PartnerContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoan } from '../context/LoanContext';
import { useAuthPartner } from '../context/AuthPartnerContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TableCreditPartner = () => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm();
  const { partners, getPartnes } = usePartner();

  const { partner } = useAuthPartner();
  const { registerLoan, getMyLoansPartner, myLoans, denyLoan } = useLoan();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingCredit, setEditingCredit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [shouldFetchLoans, setShouldFetchLoans] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCancelCredit = (id) => {
    setSelectedLoanId(id);
    setIsModalOpen(true);
  };

  const onCancelSubmit = async () => {
    try {
      const success = await denyLoan(selectedLoanId);
      if (success) {
        toast.success('Crédito anulado');
        getMyLoansPartner();
        closeModal();
      }
    } catch (error) {
      toast.error('Error al anular el crédito');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoanId(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = async () => {
    setValue('partnerId', partner.dni);
    const updateData = getValues();
    const success = await registerLoan(updateData);
    if (success) {
      getMyLoansPartner();
      reset();
    }
  };

  useEffect(() => {
    if (shouldFetchLoans) {
      getMyLoansPartner();
      setShouldFetchLoans(false);
    }
  }, [shouldFetchLoans, getMyLoansPartner]);

  const filteredLoans = myLoans.filter((credit) =>
    credit.id.toString().includes(searchTerm)
  );

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
          {isFormVisible ? 'Cancelar' : 'Solicitar crédito'}
        </button>
        <input
          type="text"
          placeholder="Buscar por número de crédito"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Número de crédito</th>
              <th className="px-4 py-2 border">Fecha de solicitud</th>
              <th className="px-4 py-2 border">Valor crédito</th>
              <th className="px-4 py-2 border">Interés</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Fecha desembolso</th>
              <th className="px-4 py-2 border">Fecha devolución</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((credit, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-sm">{credit.id}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(credit.applicationDate).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(credit.capital)}</td>
                <td className="border px-4 py-2 text-sm">{(credit.interest * 100).toFixed(1)}</td>
                <td className="border px-4 py-2 text-sm">{credit.isApproved ? 'Aprobado' : 'No aprobado'}</td>
                <td className="border px-4 py-2 text-sm">{credit.disbursementDate ? dayjs(credit.disbursementDate).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(credit.returnDate).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">
                  {!credit.isApproved && (
                    <button onClick={() => handleCancelCredit(credit.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Anular
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
          <h2 className="text-lg font-semibold mb-2">{editingCredit !== null ? 'Editar Crédito' : 'Solicitud de Crédito'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <input
                  type="text"
                  id="partnerId"
                  name="partnerId"
                  value={partner.dni}
                  {...register('partnerId', { required: false })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                  disabled
                />
                {errors.partnerId && <p className="text-red-500">La cédula es requerida</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="capital" className="block text-sm font-medium text-gray-700">
                  Monto
                </label>
                <input
                  type="number"
                  id="capital"
                  {...register('capital', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.capital && <p className="text-red-500">El monto es requerido</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                  Devolución de crédito
                </label>
                <input
                  type="date"
                  id="returnDate"
                  {...register('returnDate', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.returnDate && <p className="text-red-500">La devolución es requerida</p>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              {editingCredit !== null ? 'Actualizar crédito' : 'Solicitar crédito'}
            </button>
          </form>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Confirmar Anulación de Crédito</h2>
            <p>¿Estás seguro de que deseas anular este crédito?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={onCancelSubmit}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Anular
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCreditPartner;
