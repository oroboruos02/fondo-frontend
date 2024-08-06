import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePayment } from '../context/PaymentContext';
dayjs.extend(utc);

const CreditPaymentAdmin = () => {
  const { getPayments, payments, approvePayment } = usePayment();
  const [shouldFetchPayments, setShouldFetchPayments] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (shouldFetchPayments) {
      getPayments();
      setShouldFetchPayments(false);
    }
  }, [shouldFetchPayments, getPayments]);

  const handleApprovePayment = async () => {
    if (selectedPaymentId) {
      await approvePayment(selectedPaymentId);
      setShouldFetchPayments(true);
      closeApprovalModal();
      toast.success('Pago aprobado con éxito');
    }
  };

  const openModal = (url) => {
    setModalImageUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl('');
  };

  const openApprovalModal = (id) => {
    setSelectedPaymentId(id);
    setIsApprovalModalOpen(true);
  };

  const closeApprovalModal = () => {
    setIsApprovalModalOpen(false);
    setSelectedPaymentId(null);
  };

  const clientesPerPage = 5;
  const totalPages = Math.ceil(payments.length / clientesPerPage);

  const filteredPayments = payments.filter(payment => {
    const partnerName = payment.loan && payment.loan.partner ? `${payment.loan.partner.name} ${payment.loan.partner.lastname}`.toLowerCase() : '';
    const loanId = payment.loanId.toString();
    return partnerName.includes(searchTerm.toLowerCase()) || loanId.includes(searchTerm);
  });

  const displayedPayments = filteredPayments.slice((currentPage - 1) * clientesPerPage, currentPage * clientesPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Currency formatter for Colombian Pesos
  const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
  });

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Aprobación de Pagos de Créditos</h2>
        <input
          type="text"
          placeholder="Buscar por socio o número de crédito"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Socio</th>
              <th className="px-4 py-2 border">Nro Crédito</th>
              <th className="px-4 py-2 border">Fecha Límite de Pago</th>
              <th className="px-4 py-2 border">Fecha de Pago</th>
              <th className="px-4 py-2 border">Pago a Capital</th>
              <th className="px-4 py-2 border">Pago a Intereses</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Mora</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Comprobante</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedPayments.map((payment, index) => (
              <tr key={index} className={`${dayjs().isAfter(dayjs(payment.paymentDeadline)) ? 'bg-red-300' : ''} `}>
                <td className="border px-4 py-2 text-sm">
                  {payment.loan && payment.loan.partner ? `${payment.loan.partner.name} ${payment.loan.partner.lastname}` : 'Socio no encontrado'}
                </td>
                <td className="border px-4 py-2 text-sm">{payment.loanId}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(payment.paymentDeadline).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">{payment.dateOfPayment ? dayjs(payment.dateOfPayment).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(payment.capital)}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(payment.interests)}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(payment.value)}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(payment.lateness)}</td>
                <td className="border px-4 py-2 text-sm">{payment.isPaid ? 'Pagado' : 'No Pagado'}</td>
                <td className="border px-4 py-2 text-sm">
                  {payment.paymentReceipt?.url ? (
                    <img
                      src={payment.paymentReceipt.url}
                      alt="Comprobante de Pago"
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => openModal(payment.paymentReceipt.url)}
                    />
                  ) : (
                    <span>No Subido</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {!payment.isPaid && payment.paymentReceipt?.url && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded text-sm"
                      onClick={() => openApprovalModal(payment.idPayment)}
                    >
                      Aprobar
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded shadow-lg max-w-xl w-full max-h-96 overflow-auto">
            <button onClick={closeModal} className="absolute top-0 right-0 m-2 text-gray-600">
              &times;
            </button>
            <img src={modalImageUrl} alt="Comprobante de Pago" className="max-w-full max-h-96 mx-auto" />
          </div>
        </div>
      )}
      {isApprovalModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Aprobación</h2>
            <p className="mb-4">¿Está seguro de que desea aprobar este pago?</p>
            <div className="flex justify-end">
              <button onClick={closeApprovalModal} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">
                Cancelar
              </button>
              <button onClick={handleApprovePayment} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditPaymentAdmin;
