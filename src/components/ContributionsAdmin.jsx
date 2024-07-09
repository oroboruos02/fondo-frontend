/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useContribution } from '../context/ContributionContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ContributionsAdmin = () => {
  const { registerContribution, contributions, getContributions, approveContribution } = useContribution();
  const [shouldFetchContributions, setShouldFetchContributions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false); // Nuevo estado para el modal de aprobación
  const [selectedContributionId, setSelectedContributionId] = useState(null); // Nuevo estado para el ID de la contribución seleccionada

  useEffect(() => {
    if (shouldFetchContributions) {
      getContributions();
      setShouldFetchContributions(false);
    }
  }, [shouldFetchContributions, getContributions]);

  const handleApprovePayment = async () => {
    if (selectedContributionId) {
      await approveContribution(selectedContributionId);
      setShouldFetchContributions(true);
      closeApprovalModal();
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
    setSelectedContributionId(id);
    setIsApprovalModalOpen(true);
  };

  const closeApprovalModal = () => {
    setIsApprovalModalOpen(false);
    setSelectedContributionId(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Aportes Mensuales de Socios</h2>
        <button
          className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => registerContribution()}
        >
          Liberar mes 
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Socio</th>
              <th className="px-4 py-2 border">Recibo</th>
              <th className="px-4 py-2 border">Nro Cuenta</th>
              <th className="px-4 py-2 border">Fecha Límite de Pago</th>
              <th className="px-4 py-2 border">Fecha de Pago</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Mora</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Cédula de Administrador</th>
              <th className="px-4 py-2 border">Comprobante</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  {contribution.account?.partner ? `${contribution.account.partner.name} ${contribution.account.partner.lastname}` : 'N/A'}
                </td>
                <td className="border px-4 py-2">{contribution.idContribution}</td>
                <td className="border px-4 py-2">{contribution.accountId}</td>
                <td className="border px-4 py-2">{dayjs(contribution.paymentDeadline).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2">{contribution.dateOfPayment ? dayjs(contribution.dateOfPayment).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2">{contribution.value}</td>
                <td className="border px-4 py-2">{contribution.lateness}</td>
                <td className="border px-4 py-2">{contribution.isPaid ? 'Pagado' : 'No Pagado'}</td>
                <td className="border px-4 py-2">{contribution.userId}</td>
                <td className="border px-4 py-2">
                  {contribution.paymentReceipt.url ? (
                    <img
                      src={contribution.paymentReceipt.url}
                      alt="Comprobante de Pago"
                      className="w-16 h-16 object-cover cursor-pointer"
                      onClick={() => openModal(contribution.paymentReceipt.url)}
                    />
                  ) : (
                    <span>No Subido</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {!contribution.isPaid && (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => openApprovalModal(contribution.idContribution)}
                    >
                      Aprobar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ContributionsAdmin;
