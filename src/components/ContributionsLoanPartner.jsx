import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePayment } from '../context/PaymentContext';

dayjs.extend(utc);

const ContributionsLoanPartner = () => {
  const { myPayments, getMyPaymentsPartner, uploadPaymentReceipt, editPaymentReceipt } = usePayment();

  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { register, handleSubmit, reset, setValue, formState: { errors }, watch } = useForm();

  const handleUploadClick = (index) => {
    const payment = myPayments.find(payment => payment.idPayment === index);
    
    setSelectedLoan(payment);
    setShowUploadForm(true);
    setShowUpdateForm(false);
    setValue('idPayment', index);
    setValue('paymentDeadline', dayjs(payment.paymentDeadline).utc().format("YYYY-MM-DD"));
    setValue('value', payment.value);
  };

  const handleUpdateClick = (index) => {
    setShowUpdateForm(true);
    setShowUploadForm(false);
    setValue('idPayment', index);
  };

  const onSubmitUpload = handleSubmit(async (data) => {
    await uploadPaymentReceipt(data);
    setShowUploadForm(false);
    getMyPaymentsPartner();
    toast.success('Pago subido con éxito');
  });

  const onSubmitUpdate = handleSubmit(async (data) => {
    await editPaymentReceipt(data);
    setShowUpdateForm(false);
    getMyPaymentsPartner();
    toast.success('Pago actualizado con éxito');
  });

  useEffect(() => {
    getMyPaymentsPartner();
  }, []);

  const dateOfPayment = watch('dateOfPayment');
  const value = watch('value');
  const paymentDeadline = watch('paymentDeadline');

  useEffect(() => {
    if (dateOfPayment && paymentDeadline && value) {
      const paymentDate = dayjs(dateOfPayment);
      const deadlineDate = dayjs(paymentDeadline);
      if (paymentDate.isAfter(deadlineDate)) {
        const lateFee = (parseFloat(value) * 0.05).toFixed(0);
        setValue('lateness', lateFee);
      } else {
        setValue('lateness', '0.00');
      }
    }
  }, [dateOfPayment, paymentDeadline, value, setValue]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
  };

  const filteredPayments = myPayments.filter(loan =>
    loan.dateOfPayment &&
    dayjs(loan.dateOfPayment).utc().format("YYYY-MM-DD").includes(searchTerm)
  );

  const clientesPerPage = 5;
  const totalPages = Math.ceil(myPayments.length / clientesPerPage);
  const displayedmyPayments = myPayments.slice((currentPage - 1) * clientesPerPage, currentPage * clientesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-4">Pago de Créditos Mensuales</h2>
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
              <th className="px-4 py-2 border">Fecha Límite de Pago</th>
              <th className="px-4 py-2 border">Fecha de Pago</th>
              <th className="px-4 py-2 border">Abono a Capital</th>
              <th className="px-4 py-2 border">Abono a Intereses</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Mora</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Comprobante de Pago</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedmyPayments.map((payment, index) => (
              <tr key={index} className={`${dayjs().isAfter(dayjs(payment.paymentDeadline)) ? 'bg-red-300' : ''} `}>
                <td className="border px-4 py-2 text-sm">{payment.idPayment}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(payment.paymentDeadline).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">{payment.dateOfPayment ? dayjs(payment.dateOfPayment).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(payment.capital)}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(payment.interests)}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(payment.value)}</td>
                <td className="border px-4 py-2 text-sm">{formatCurrency(payment.lateness)}</td>
                <td className="border px-4 py-2 text-sm">{payment.isPaid ? 'Pagado' : 'No pagado'}</td>
                <td className="border px-4 py-2 text-sm">
                  {payment.paymentReceipt?.url ? (
                    <span>Comprobante subido</span>
                  ) : (
                    <span>Comprobante no subido</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-sm">
                  {!payment.isPaid && (
                    <button
                      className={`bg-${payment.paymentReceipt?.url ? 'yellow' : 'green'}-500 hover:bg-${payment.paymentReceipt?.url ? 'yellow' : 'green'}-700 text-white py-1 px-4 rounded`}
                      onClick={() => {
                        if (payment.paymentReceipt?.url) {
                          handleUpdateClick(payment.idPayment);
                        } else {
                          handleUploadClick(payment.idPayment);
                        }
                      }}
                    >
                      {payment.paymentReceipt?.url ? 'Actualizar' : 'Subir'}
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
                {...register('idPayment')}
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
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Subir Pago
              </button>
              <button
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Cancelar
              </button>
            </div>
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
                {...register('idPayment')}
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
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Actualizar Pago
              </button>
              <button
                type="button"
                onClick={() => setShowUpdateForm(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContributionsLoanPartner;
