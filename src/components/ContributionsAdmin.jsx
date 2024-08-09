import React, { useEffect, useState } from 'react';
import { useContribution } from '../context/ContributionContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
dayjs.extend(utc);

const ContributionsAdmin = () => {
  const { registerContribution, contributions, getContributions, approveContribution } = useContribution();
  const [shouldFetchContributions, setShouldFetchContributions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedContributionId, setSelectedContributionId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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
    setSelectedContributionId(id);
    setIsApprovalModalOpen(true);
  };

  const closeApprovalModal = () => {
    setIsApprovalModalOpen(false);
    setSelectedContributionId(null);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleRegisterContribution = async () => {
    await registerContribution();
    closeRegisterModal();
    toast.success('Mes liberado con éxito');
    setShouldFetchContributions(true);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredContributions = contributions.filter(contribution =>
    contribution.account?.partner?.name.toLowerCase().includes(searchTerm) ||
    contribution.account?.partner?.lastname.toLowerCase().includes(searchTerm)
  );

  // Sort contributions by dateOfPayment in descending order
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
        <h2 className="text-lg font-semibold">Aportes Mensuales de Socios</h2>
        <button
          className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
          onClick={openRegisterModal}
        >
          Liberar mes
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de socio"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded w-full text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre Socio</th>
              <th className="px-4 py-2 border">Recibo</th>
              <th className="px-4 py-2 border">Nro Cuenta</th>
              <th className="px-4 py-2 border">Fecha Límite de Pago</th>
              <th className="px-4 py-2 border">Fecha de Pago</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Mora</th>
              <th className="px-4 py-2 border">Estado</th>
              <th className="px-4 py-2 border">Cédula administrador</th>
              <th className="px-4 py-2 border">Comprobante</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {displayedContributions.map((contribution, index) => (
              <tr
                key={index}
                className={`${
                  !contribution.isPaid ? 'bg-red-300' : ''
                }`}
              >
                <td className="border px-4 py-2 text-sm">
                  {contribution.account?.partner
                    ? `${contribution.account.partner.name} ${contribution.account.partner.lastname}`
                    : 'N/A'}
                </td>
                <td className="border px-4 py-2 text-sm">{contribution.idContribution}</td>
                <td className="border px-4 py-2 text-sm">{contribution.accountId}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(contribution.paymentDeadline).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">{contribution.dateOfPayment ? dayjs(contribution.dateOfPayment).utc().format("DD/MM/YYYY") : ''}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(contribution.value)}</td>
                <td className="border px-4 py-2 text-sm">{currencyFormatter.format(contribution.lateness)}</td>
                <td className="border px-4 py-2 text-sm">{contribution.isPaid ? 'Pagado' : 'No Pagado'}</td>
                <td className="border px-4 py-2 text-sm">{contribution.userId}</td>
                <td className="border px-4 py-2 text-sm">
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
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-4 rounded text-sm"
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
        <div className="flex justify-between mt-4">
          <button
            className={`bg-black text-white px-4 py-2 rounded text-sm ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            className={`bg-black text-white px-4 py-2 rounded text-sm ${
              currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
            }`}
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
      {isRegisterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Confirmar Liberación de Mes</h2>
            <p className="mb-4">¿Está seguro de que desea liberar este mes?</p>
            <div className="flex justify-end">
              <button onClick={closeRegisterModal} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">
                Cancelar
              </button>
              <button onClick={handleRegisterContribution} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                Liberar Mes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionsAdmin;
