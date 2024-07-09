/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAccount } from '../context/AccountContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TableAccountPartner = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { myAccounts, getMyAccountsPartner } = useAccount();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = myAccounts.filter((account) =>
    account.openingDate.includes(searchTerm)
  );

  useEffect(() => {
    getMyAccountsPartner();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar por fecha de apertura"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ID cuenta</th>
              <th className="px-4 py-2 border">Cupos</th>
              <th className="px-4 py-2 border">Valor</th>
              <th className="px-4 py-2 border">Total inscripción</th>
              <th className="px-4 py-2 border">Fecha de apertura</th>
              <th className="px-4 py-2 border">Pagos</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-sm">{account.id}</td>
                <td className="border px-4 py-2 text-sm">{account.quotas}</td>
                <td className="border px-4 py-2 text-sm">${account.value}</td>
                <td className="border px-4 py-2 text-sm">${account.initialInvestment}</td>
                <td className="border px-4 py-2 text-sm">{dayjs(account.openingDate).utc().format("DD/MM/YYYY")}</td>
                <td className="border px-4 py-2 text-sm">${account.myPayments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAccountPartner;