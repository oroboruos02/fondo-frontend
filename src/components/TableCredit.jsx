import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { usePartner } from '../context/PartnerContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoan } from '../context/LoanContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TableCredit = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { partners, getPartnes } = usePartner();
  const [searchTerm, setSearchTerm] = useState('');
  const { registerLoan, approveLoan, getLoans, loans, denyLoan, payOffLoan, extendLoan } = useLoan();
  const [editingCredit, setEditingCredit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isApproveFormVisible, setIsApproveFormVisible] = useState(false);
  const [isPostponeFormVisible, setIsPostponeFormVisible] = useState(false);
  const [selectedCreditForPostpone, setSelectedCreditForPostpone] = useState(null);
  const [shouldFetchPartners, setShouldFetchPartners] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiquidateModalOpen, setIsLiquidateModalOpen] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [selectedLoanCapital, setSelectedLoanCapital] = useState(null);

  const interestRates = {
    1: 0.01,
    1.1: 0.011,
    1.2: 0.012,
    1.3: 0.013,
    1.4: 0.014,
    1.5: 0.015,
    1.6: 0.016,
    1.7: 0.017,
    1.8: 0.018,
    1.9: 0.019,
    2.0: 0.02,
    2.1: 0.021,
    2.2: 0.022,
    2.3: 0.023,
    2.4: 0.024,
    2.5: 0.025,
    2.6: 0.026,
    2.7: 0.027,
    2.8: 0.028,
    2.9: 0.029,
    3.0: 0.03,
    3.1: 0.031,
    3.2: 0.032,
    3.3: 0.033,
    3.4: 0.034,
    3.5: 0.035,
    3.6: 0.036,
    3.7: 0.037,
    3.8: 0.038,
    3.9: 0.039,
    4.0: 0.04
  };

  const sortedRates = Object.entries(interestRates).sort(([rateA], [rateB]) => rateA - rateB);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleApproveCredit = async (index) => {
    setSelectedLoanId(index);
    setEditingCredit(index);
    setValue('loanId', index);
    setIsApproveFormVisible(true);
    setIsFormVisible(false);
  };

  const handleCancelCredit = (id) => {
    setSelectedLoanId(id);
    setIsModalOpen(true);
  };

  const handleLiquidateCredit = (id, capital) => {
    setSelectedLoanId(id);
    setSelectedLoanCapital(capital);
    setIsLiquidateModalOpen(true);
  };

  const handleOpenPostponeForm = (credit) => {
    setSelectedCreditForPostpone(credit.id);
    setValue('loanId', credit.id); // Ajuste aquí para asegurarse de que el loanId se registre en el formulario
    setIsPostponeFormVisible(true);
    setIsFormVisible(false);
  };

  const onCancelSubmit = async () => {
    try {
      const success = await denyLoan(selectedLoanId);
      if(success) {
        toast.success('Crédito anulado');
        getLoans();
        closeModal();
      }
    } catch (error) {
      toast.error('Error al anular el crédito');
    }
  };

  const onLiquidateSubmit = async () => {
    try {
      const success = await payOffLoan(selectedLoanId);
      if(success) {
        toast.success('Crédito liquidado');
        getLoans();
        closeLiquidateModal();
      }
    } catch (error) {
      toast.error('Error al liquidar el crédito');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLoanId(null);
  };

  const closeLiquidateModal = () => {
    setIsLiquidateModalOpen(false);
    setSelectedLoanId(null);
    setSelectedLoanCapital(null);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIsApproveFormVisible(false);
  };

  const onSubmit = async (data) => {
    const success = await registerLoan(data);
    if (success) {
      getLoans();
      reset();
    }
  };

  const onApproveSubmit = async (data) => {
    const success = await approveLoan(data);
    if(success) {
      toast.success('Crédito aprobado');
      getLoans();
      reset();
    }
    setIsApproveFormVisible(false);
  };

  const onSubmitPostpone = handleSubmit(async (data) => {
    try {
      const success = await extendLoan(data);
      if(success) {
        toast.success('Plazo del crédito actualizado con éxito');
        reset();
        setIsPostponeFormVisible(false);
        getLoans();
      }
    } catch (error) {
      toast.error('Error al aplazar el crédito');
    }
  });

  useEffect(() => {
    if (shouldFetchPartners) {
      getPartnes();
      getLoans();
      setShouldFetchPartners(false);
    }
  }, [shouldFetchPartners, getPartnes]);

  const clientesPerPage = 10;
  const totalPages = Math.ceil(loans.length / clientesPerPage);
  const displayedLoans = loans.filter((credit) => 
    credit.id.toString().includes(searchTerm) ||
    credit.partner.dni.includes(searchTerm) ||
    `${credit.partner.name} ${credit.partner.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice((currentPage - 1) * clientesPerPage, currentPage * clientesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Formateador de números para monedas
  const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  });

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
              <th className="px-4 py-2 border">Número crédito</th>
              <th className="px-4 py-2 border">Cédula socio</th>
              <th className="px-4 py-2 border">Nombre socio</th>
              <th className="px-4 py-2 border">Fecha de solicitud</th>
              <th className="px-4 py-2 border">Valor crédito</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Fecha desembolso</th>
              <th className="px-4 py-2 border">Fecha devolución</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedLoans.map((credit, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-sm">{credit.id}</td>
                <td className="border px-4 py-2 text-sm">{credit.partner.dni}</td>
                <td className="border px-4 py-2 text-sm">{credit.partner.name} {credit.partner.lastname}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(credit.applicationDate).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(credit.capital)}</td>
                <td className="border px-4 py-2 text-sm">{credit.isApproved ? 'Aprobado' : 'No aprobado'}</td>
                <td className="border px-4 py-2 text-sm">{credit.disbursementDate ? dayjs(credit.disbursementDate).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(credit.returnDate).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    {!credit.isApproved && (
                      <>
                        <button onClick={() => handleApproveCredit(credit.id)} className="bg-black text-white px-3 py-1 rounded hover:bg-gray-700 transition duration-300 ease-in-out w-full sm:w-auto">
                          Aprobar
                        </button>
                        <button onClick={() => handleCancelCredit(credit.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 ease-in-out w-full sm:w-auto mt-2 sm:mt-0">
                          Anular
                        </button>
                      </>
                    )}
                    {credit.isApproved && !credit.isPaid && (
                      <>
                        <button onClick={() => handleOpenPostponeForm(credit)} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded w-full sm:w-auto">
                          Aplazar
                        </button>
                        <button onClick={() => handleLiquidateCredit(credit.id, credit.capital)} className="bg-green-500 hover:bg-green-700 text-white px-3 py-1 rounded w-full sm:w-auto mt-2 sm:mt-0">
                          Liquidar
                        </button>
                      </>
                    )}
                  </div>
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
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Solicitud de Crédito</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="partnerId" className="block text-sm font-medium text-gray-700">
                  Nombre del socio
                </label>
                <select
                  id="partnerId"
                  {...register('partnerId', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                >
                  {partners.map((partner) => (
                    <option key={partner.dni} value={partner.dni}>
                      {partner.name} {partner.lastname}
                    </option>
                  ))}
                </select>
                {errors.partnerId && <p className="text-red-500">El socio es requerido</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="capital" className="block text-sm font-medium text-gray-700">
                  Valor del crédito
                </label>
                <input
                  type="number"
                  id="capital"
                  {...register('capital', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.capital && <p className="text-red-500">El valor es requerido</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="applicationDate" className="block text-sm font-medium text-gray-700">
                  Fecha de solicitud
                </label>
                <input
                  type="date"
                  id="applicationDate"
                  {...register('applicationDate', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.applicationDate && <p className="text-red-500">La solicitud es requerida</p>}
              </div>
            </div>
            <div className="mb-4">
              <div className="w-1/3 pr-2">
                <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
                  Fecha de devolución
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
            <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
              Solicitar crédito
            </button>
          </form>
        </div>
      )}
      {isApproveFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Aprobación de Crédito</h2>
          <form onSubmit={handleSubmit(onApproveSubmit)}>
            <div className="mb-4">
              <label htmlFor="loanId" className="block text-sm font-medium text-gray-700">
                Número crédito
              </label>
              <input
                type="text"
                id="loanId"
                {...register('loanId', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">
                Tasa de interés
              </label>
              <select
                id="interest"
                {...register('interest', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
              >
                {sortedRates.map(([rate, value]) => (
                  <option key={rate} value={value}>
                    {rate}%
                  </option>
                ))}
              </select>
              {errors.interest && <p className="text-red-500">La tasa de interés es requerida</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="amortization" className="block text-sm font-medium text-gray-700">
                Amortización
              </label>
              <select
                id="amortization"
                {...register('amortization', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
              >
                <option value={"1"}>Interés</option>
                <option value={"2"}>Interés + Capital</option>
              </select>
              {errors.amortization && <p className="text-red-500">La amortización es requerida</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                Plazo
              </label>
              <select
                id="term"
                {...register('term', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
              >
                {Array.from({ length: 300 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.term && <p className="text-red-500">El plazo es requerido</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="disbursementDate" className="block text-sm font-medium text-gray-700">
                Fecha de desembolso
              </label>
              <input
                type="date"
                id="disbursementDate"
                {...register('disbursementDate', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
              />
              {errors.disbursementDate && <p className="text-red-500">La fecha de desembolso es requerida</p>}
            </div>
            <button type="submit" className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
              Aprobar crédito
            </button>
          </form>
        </div>
      )}
      {isPostponeFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Aplazar Crédito</h2>
          <form onSubmit={onSubmitPostpone}>
            <div className="mb-4">
              <label htmlFor="loanId" className="block text-sm font-medium text-gray-700">
                Número de Crédito
              </label>
              <input
                type="text"
                id="loanId"
                value={selectedCreditForPostpone}
                {...register('loanId', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
                disabled
              />
            </div>
            <div className="mb-4">
              <label htmlFor="term" className="block text-sm font-medium text-gray-700">
                Meses a Aplazar
              </label>
              <select
                id="term"
                {...register('term', { required: true })}
                className="border border-gray-300 p-2 rounded w-full text-sm"
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              {errors.term && <p className="text-red-500">El número de meses es requerido</p>}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Guardar Cambios
            </button>
            <button onClick={() => setIsPostponeFormVisible(false)} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded ml-2">
              Cancelar
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
      {isLiquidateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Confirmar Liquidación de Crédito</h2>
            <p>¿Estás seguro de que deseas liquidar este crédito por {currencyFormatter.format(selectedLoanCapital)}?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeLiquidateModal}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={onLiquidateSubmit}
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Liquidar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableCredit;
