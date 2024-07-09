/* eslint-disable react-hooks/exhaustive-deps */
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

  return (
    <div className="p-4">
      <ToastContainer />
      <h2 className="text-lg font-semibold mb-4">Aportes Mensuales</h2>
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
            {myContributions.map((contribution, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{contribution.idContribution}</td>
                <td className="border px-4 py-2">{contribution.accountId}</td>
                <td className="border px-4 py-2">{dayjs(contribution.paymentDeadline).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2">{contribution.dateOfPayment ? dayjs(contribution.dateOfPayment).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2">{contribution.value}</td>
                <td className="border px-4 py-2">{contribution.lateness}</td>
                <td className="border px-4 py-2">{contribution.isPaid ? 'Pagado' : 'No pagado'}</td>
                <td className="border px-4 py-2">
                  {contribution.paymentReceipt?.url ? (
                    <span>Comprobante subido</span>
                  ) : (
                    <span>Comprobante no subido</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  <button
                    className={`bg-${contribution.paymentReceipt?.url ? 'yellow' : 'green'}-500 hover:bg-${contribution.paymentReceipt?.url ? 'yellow' : 'green'}-700 text-white font-bold py-2 px-4 rounded`}
                    onClick={() => {
                      if (contribution.paymentReceipt?.url) {
                        handleUpdateClick(index);
                      } else {
                        handleUploadClick(index);
                      }
                    }}
                  >
                    {contribution.paymentReceipt?.url ? 'Actualizar Pago' : 'Subir Pago'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showUploadForm && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Subir Pago</h3>
          <form onSubmit={onSubmitUpload}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                ID del Pago
              </label>
              <input
                type="text"
                {...register('idContribution')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Fecha de Pago
              </label>
              <input
                type="date"
                {...register('dateOfPayment', { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.image && <p className='text-red-500'>El comprobante de pago es requerido</p>}
            </div>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Subir
            </button>
          </form>
        </div>
      )}

      {showUpdateForm && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">Actualizar Pago</h3>
          <form onSubmit={onSubmitUpdate}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                ID del Pago
              </label>
              <input
                type="text"
                {...register('idContribution')}
                disabled
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.image && <p className='text-red-500'>El comprobante de pago es requerido</p>}
            </div>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Actualizar
            </button>
          </form>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ContributionsPartner;