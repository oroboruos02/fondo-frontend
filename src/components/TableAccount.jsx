import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TableAccount = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([
    { id: '1', fechaApertura: '2023-01-01', cuotas: 12, inversionInicial: 1000, pagos: 100 },
    { id: '2', fechaApertura: '2023-02-01', cuotas: 24, inversionInicial: 2000, pagos: 200 },
  ]);

  const [editingAccount, setEditingAccount] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.fechaApertura.includes(searchTerm) ||
      account.cuotas.toString().includes(searchTerm) ||
      account.inversionInicial.toString().includes(searchTerm) ||
      account.pagos.toString().includes(searchTerm)
  );

  const handleCreateAccount = (data) => {
    setAccounts([...accounts, data]);
    reset();
    setIsFormVisible(false);
  };

  const handleUpdateAccount = (data) => {
    const updatedAccounts = accounts.map((account, index) => (index === editingAccount ? data : account));
    setAccounts(updatedAccounts);
    reset();
    setEditingAccount(null);
    setIsFormVisible(false);
  };

  const handleEditAccount = (index) => {
    const accountToEdit = accounts[index];
    setValue('id', accountToEdit.id);
    setValue('fechaApertura', accountToEdit.fechaApertura);
    setValue('cuotas', accountToEdit.cuotas);
    setValue('inversionInicial', accountToEdit.inversionInicial);
    setValue('pagos', accountToEdit.pagos);
    setEditingAccount(index);
    setIsFormVisible(true);
  };

  const handleDeleteAccount = (index) => {
    setAccounts(accounts.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = (data) => {
    if (editingAccount !== null) {
      handleUpdateAccount(data);
    } else {
      handleCreateAccount(data);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear cuenta'}
        </button>
        <input
          type="text"
          placeholder="Buscar por fecha de apertura, cuotas, inversión inicial o pagos"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Fecha de Apertura</th>
              <th className="px-4 py-2 border">Cuotas</th>
              <th className="px-4 py-2 border">Inversión Inicial</th>
              <th className="px-4 py-2 border">Pagos</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{account.fechaApertura}</td>
                <td className="border px-4 py-2">{account.cuotas}</td>
                <td className="border px-4 py-2">{account.inversionInicial}</td>
                <td className="border px-4 py-2">{account.pagos}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditAccount(index)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteAccount(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">{editingAccount !== null ? 'Editar Cuenta' : 'Agregar Nueva Cuenta'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="id" className="block text-sm font-medium text-gray-700">
                ID
              </label>
              <select
                id="id"
                name="id"
                {...register('id', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="numeroCupos" className="block text-sm font-medium text-gray-700">
                Número de Cupos
              </label>
              <select
                id="numeroCupos"
                name="numeroCupos"
                {...register('numeroCupos', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              {editingAccount !== null ? 'Actualizar cuenta' : 'Crear cuenta'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TableAccount;