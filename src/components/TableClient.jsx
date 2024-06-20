import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TableClientes = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [clientes, setClientes] = useState([
    { cedula: '1234567890', nombre: 'Carlos', apellidos: 'Lopez', telefono: '123456789', correo: 'carloslopez@gmail.com', direccion: 'Calle Falsa 123' },
    { cedula: '0987654321', nombre: 'Maria', apellidos: 'Rodriguez', telefono: '987654321', correo: 'mariarodriguez@gmail.com', direccion: 'Av. Siempre Viva 456' },
  ]);

  const [editingCliente, setEditingCliente] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm) ||
      cliente.cedula.includes(searchTerm)
  );

  const handleCreateCliente = (data) => {
    setClientes([...clientes, data]);
    reset();
    setIsFormVisible(false);
  };

  const handleUpdateCliente = (data) => {
    const updatedClientes = clientes.map((cliente, index) => (index === editingCliente ? data : cliente));
    setClientes(updatedClientes);
    reset();
    setEditingCliente(null);
    setIsFormVisible(false);
  };

  const handleEditCliente = (index) => {
    const clienteToEdit = clientes[index];
    setValue('cedula', clienteToEdit.cedula);
    setValue('nombre', clienteToEdit.nombre);
    setValue('apellidos', clienteToEdit.apellidos);
    setValue('telefono', clienteToEdit.telefono);
    setValue('correo', clienteToEdit.correo);
    setValue('direccion', clienteToEdit.direccion);
    setEditingCliente(index);
    setIsFormVisible(true);
  };

  const handleDeleteCliente = (index) => {
    setClientes(clientes.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = (data) => {
    if (editingCliente !== null) {
      handleUpdateCliente(data);
    } else {
      handleCreateCliente(data);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear cliente'}
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre, apellidos, teléfono o cédula"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Cédula</th>
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
                <td className="border px-4 py-2">{cliente.cedula}</td>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  {...register('cedula', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  {...register('nombre', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  {...register('apellidos', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  {...register('telefono', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  {...register('correo', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  {...register('direccion', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <button
              type="submit"
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