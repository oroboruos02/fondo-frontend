import React, { useState } from 'react';

const TableClientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([
    { nombre: 'Carlos', apellidos: 'Lopez', telefono: '123456789', correo: 'carloslopez@gmail.com', direccion: 'Calle Falsa 123' },
    { nombre: 'Maria', apellidos: 'Rodriguez', telefono: '987654321', correo: 'mariarodriguez@gmail.com', direccion: 'Av. Siempre Viva 456' },
  ]);

  const [newCliente, setNewCliente] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    direccion: '',
  });

  const [editingCliente, setEditingCliente] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm)
  );

  const handleCreateCliente = () => {
    if (newCliente.nombre.trim() === '' || newCliente.apellidos.trim() === '' || newCliente.telefono.trim() === '' || newCliente.correo.trim() === '' || newCliente.direccion.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    setClientes([...clientes, newCliente]);
    setNewCliente({
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      direccion: '',
    });
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCliente((prevCliente) => ({
      ...prevCliente,
      [name]: value,
    }));
  };

  const handleDeleteCliente = (index) => {
    setClientes(clientes.filter((_, i) => i !== index));
  };

  const handleEditCliente = (index) => {
    setEditingCliente(index);
    setNewCliente(clientes[index]);
    setIsFormVisible(true);
  };

  const handleUpdateCliente = () => {
    if (newCliente.nombre.trim() === '' || newCliente.apellidos.trim() === '' || newCliente.telefono.trim() === '' || newCliente.correo.trim() === '' || newCliente.direccion.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    const updatedClientes = clientes.map((cliente, index) => (index === editingCliente ? newCliente : cliente));
    setClientes(updatedClientes);
    setNewCliente({
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      direccion: '',
    });
    setEditingCliente(null);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear cliente'}
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre, apellidos o teléfono"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellidos</th>
              <th className="px-4 py-2 border">Teléfono</th>
              <th className="px-4 py-2 border">Correo</th>
              <th className="px-4 py-2 border">Dirección</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.apellidos}</td>
                <td className="border px-4 py-2">{cliente.telefono}</td>
                <td className="border px-4 py-2">{cliente.correo}</td>
                <td className="border px-4 py-2">{cliente.direccion}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditCliente(index)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCliente(index)} className="bg-red-500 text-white px-2 py-1 rounded">
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
          <h2 className="text-lg font-semibold mb-2">{editingCliente !== null ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}</h2>
          <form>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={newCliente.nombre}
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
                  value={newCliente.apellidos}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  value={newCliente.telefono}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={newCliente.correo}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-full">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={newCliente.direccion}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={editingCliente !== null ? handleUpdateCliente : handleCreateCliente}
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              {editingCliente !== null ? 'Actualizar cliente' : 'Crear'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TableClientes;