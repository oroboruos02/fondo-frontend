import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContribution } from '../context/ContributionContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

dayjs.extend(utc);

const ContributionsPartner = () => {
  const { myContributions, getMyContributionsPartner, uploadPaymentReceipt, editPaymentReceipt } = useContribution();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm();

  const handleUploadClick = (index) => {
    const contribution = myContributions[index];
    setSelectedContribution(contribution);
    setShowUploadForm(true);
    setShowUpdateForm(false);
    setValue('idContribution', contribution.idContribution);
    setValue('paymentDeadline', dayjs(contribution.paymentDeadline).utc().format("YYYY-MM-DD"));
    setValue('value', contribution.value);
  };

  const handleUpdateClick = (index) => {
    const contribution = myContributions[index];
    setSelectedContribution(contribution);
    setShowUpdateForm(true);
    setShowUploadForm(false);
    setValue('idContribution', contribution.idContribution);
  };

  const onSubmitUpload = handleSubmit(async (data) => {
    await uploadPaymentReceipt(data);
    setShowUploadForm(false);
    getMyContributionsPartner(); // Reload the contributions
    toast.success('Pago subido con éxito');
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    await editPaymentReceipt(data);
    setShowUpdateForm(false);
    getMyContributionsPartner(); // Reload the contributions
    toast.success('Pago actualizado con éxito');
  });

  useEffect(() => {
    getMyContributionsPartner();
  }, []);

  const dateOfPayment = watch('dateOfPayment');
  const value = watch('value');
  const paymentDeadline = watch('paymentDeadline');

  useEffect(() => {
    if (dateOfPayment && paymentDeadline && value) {
      const paymentDate = dayjs(dateOfPayment);
      const deadlineDate = dayjs(paymentDeadline);
      if (paymentDate.isAfter(deadlineDate)) {
        const lateFee = (parseFloat(value) * 0.05).toFixed(2);
        setValue('lateness', lateFee);
      } else {
        setValue('lateness', '0.00');
      }
    }
  }, [dateOfPayment, paymentDeadline, value, setValue]);

  const filteredContributions = myContributions.filter(contribution =>
    contribution.dateOfPayment &&
    dayjs(contribution.dateOfPayment).utc().format("YYYY-MM-DD").includes(searchTerm)
  );

  // Ordenar las contribuciones por la fecha de pago en orden descendente
  const sortedContributions = filteredContributions.sort((a, b) => {
    if (!a.dateOfPayment) return 1;
    if (!b.dateOfPayment) return -1;
    return dayjs(b.dateOfPayment).diff(dayjs(a.dateOfPayment));
  });

  const clientesPerPage = 10;
  const totalPages = Math.ceil(sortedContributions.length / clientesPerPage);
  const displayedContributions = sortedContributions.slice((currentPage - 1) * clientesPerPage, currentPage * clientesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-4">Aportes Mensuales</h2>
      <input
        type="text"
        placeholder="Buscar por fecha de pago (YYYY-MM-DD)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-46 text-sm"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Recibo</th>
              <th className="px-4 py-2 border">Nro Cuenta</th>
              <th className="px-4 py-2 border">Fecha Límite de Pago</th>
              <th className="px-4 py-2 border">Fecha de Pago</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Mora</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Comprobante de Pago</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedContributions.map((contribution, index) => (
              <tr key={index} className={`${!contribution.isPaid ? 'bg-red-300' : ''} `}>
                <td className="border px-4 py-2 text-sm">{contribution.idContribution}</td>
                <td className="border px-4 py-2 text-sm">{contribution.accountId}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(contribution.paymentDeadline).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">{contribution.dateOfPayment ? dayjs(contribution.dateOfPayment).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(contribution.value)}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(contribution.lateness)}</td>
                <td className="border px-4 py-2 text-sm">{contribution.isPaid ? 'Pagado' : 'No pagado'}</td>
                <td className="border px-4 py-2 text-sm">
                  {contribution.paymentReceipt?.url ? (
                    <span>Subido</span>
                  ) : (
                    <span>No subido</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {!contribution.isPaid && (
                    <button
                      className={`bg-${contribution.paymentReceipt?.url ? 'yellow' : 'green'}-500 hover:bg-${contribution.paymentReceipt?.url ? 'yellow' : 'green'}-700 text-white py-1 px-4 rounded`}
                      onClick={() => {
                        if (contribution.paymentReceipt?.url) {
                          handleUpdateClick(index);
                        } else {
                          handleUploadClick(index);
                        }
                      }}
                    >
                      {contribution.paymentReceipt?.url ? 'Actualizar' : 'Subir'}
                    </button>
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

      {showUploadForm && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Subir</h3>
          <form onSubmit={onSubmitUpload}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                ID del Pago
              </label>
              <input
                type="text"
                {...register('idContribution')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Fecha Límite de Pago
              </label>
              <input
                type="date"
                {...register('paymentDeadline')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Valor
              </label>
              <input
                type="text"
                {...register('value')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Fecha de Pago
              </label>
              <input
                type="date"
                {...register('dateOfPayment', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
              {errors.dateOfPayment && <p className='text-red-500'>La fecha de pago es requerida</p>}
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Mora
              </label>
              <input
                type="text"
                {...register('lateness')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Comprobante de Pago
              </label>
              <input
                type="file"
                accept=".png,.jpg"
                {...register('image', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
              {errors.image && <p className='text-red-500'>El comprobante de pago es requerido</p>}
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Subir
            </button>
          </form>
        </div>
      )}

      {showUpdateForm && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Actualizar</h3>
          <form onSubmit={onSubmitUpdate}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                ID del Pago
              </label>
              <input
                type="text"
                {...register('idContribution')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Comprobante de Pago
              </label>
              <input
                type="file"
                accept=".png,.jpg"
                {...register('image', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              />
              {errors.image && <p className='text-red-500'>El comprobante de pago es requerido</p>}
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Actualizar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContributionsPartner;
