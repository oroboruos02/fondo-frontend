import React, { useState } from 'react';

const ContributionsPartner = () => {
  const [contributions, setContributions] = useState([
    { receipt: '001', accountNumber: '1234567890', paymentDate: '2024-01-01', amount: '100.00', status: '' },
    { receipt: '002', accountNumber: '0987654321', paymentDate: '2024-02-01', amount: '150.00', status: '' },
    // Agrega más contribuciones según sea necesario...
  ]);

  const handleFileUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedContributions = contributions.map((contribution, idx) => {
        if (idx === index) {
          return { ...contribution, status: file.name };
        }
        return contribution;
      });
      setContributions(updatedContributions);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Aportes Mensuales</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Recibo</th>
              <th className="px-4 py-2 border">Nro Cuenta</th>
              <th className="px-4 py-2 border">Fecha de Pago</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((contribution, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{contribution.receipt}</td>
                <td className="border px-4 py-2">{contribution.accountNumber}</td>
                <td className="border px-4 py-2">{contribution.paymentDate}</td>
                <td className="border px-4 py-2">{contribution.amount}</td>
                <td className="border px-4 py-2">
                  {contribution.status ? (
                    <span>{contribution.status}</span>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => handleFileUpload(index, event)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributionsPartner;
