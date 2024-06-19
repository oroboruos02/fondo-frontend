import React, { useState } from 'react';

const TableAccount = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([
    { numeroCuenta: '123456', propietarioCc: '100200300', nombre: 'Juan', apellidos: 'Perez' },
    { numeroCuenta: '654321', propietarioCc: '400500600', nombre: 'Ana', apellidos: 'Gomez' },
  ]);

  const [newAccount, setNewAccount] = useState({
    numeroCuenta: '',
    propietarioCc: '',
    nombre: '',
    apellidos: '',
  });

  const [editingAccount, setEditingAccount] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.numeroCuenta.includes(searchTerm) ||
      account.propietarioCc.includes(searchTerm) ||
      account.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateAccount = () => {
    if (newAccount.numeroCuenta.trim() === '' || newAccount.propietarioCc.trim() === '' || newAccount.nombre.trim() === '' || newAccount.apellidos.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    setAccounts([...accounts, newAccount]);
    setNewAccount({
      numeroCuenta: '',
      propietarioCc: '',
      nombre: '',
      apellidos: '',
    });
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleDeleteAccount = (index) => {
    setAccounts(accounts.filter((_, i) => i !== index));
  };

  const handleEditAccount = (index) => {
    setEditingAccount(index);
    setNewAccount(accounts[index]);
    setIsFormVisible(true);
  };

  const handleUpdateAccount = () => {
    if (newAccount.numeroCuenta.trim() === '' || newAccount.propietarioCc.trim() === '' || newAccount.nombre.trim() === '' || newAccount.apellidos.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    const updatedAccounts = accounts.map((account, index) => (index === editingAccount ? newAccount : account));
    setAccounts(updatedAccounts);
    setNewAccount({
      numeroCuenta: '',
      propietarioCc: '',
      nombre: '',
      apellidos: '',
    });
    setEditingAccount(null);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear cuenta'}
        </button>
        <input
          type="text"
          placeholder="Buscar por número de cuenta, CC, nombre o apellidos"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Número de Cuenta</th>
              <th className="px-4 py-2 border">Propietario CC</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellidos</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{account.numeroCuenta}</td>
                <td className="border px-4 py-2">{account.propietarioCc}</td>
                <td className="border px-4 py-2">{account.nombre}</td>
                <td className="border px-4 py-2">{account.apellidos}</td>
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
          <form>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="numeroCuenta" className="block text-sm font-medium text-gray-700">
                  Número de Cuenta
                </label>
                <input
                  type="text"
                  id="numeroCuenta"
                  name="numeroCuenta"
                  value={newAccount.numeroCuenta}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="propietarioCc" className="block text-sm font-medium text-gray-700">
                  Propietario CC
                </label>
                <input
                  type="text"
                  id="propietarioCc"
                  name="propietarioCc"
                  value={newAccount.propietarioCc}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={newAccount.nombre}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  value={newAccount.apellidos}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={editingAccount !== null ? handleUpdateAccount : handleCreateAccount}
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