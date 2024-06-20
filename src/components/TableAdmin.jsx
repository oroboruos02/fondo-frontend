import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TableAdmin = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { cedula: '1234567890', nombre: 'Juan', apellidos: 'Perez', correo: 'juanperez@gmail.com', contrasena: 'password1' },
    { cedula: '0987654321', nombre: 'Ana', apellidos: 'Gomez', correo: 'anagomez@gmail.com', contrasena: 'password2' },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cedula.includes(searchTerm) ||
      user.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (data) => {
    setUsers([...users, data]);
    reset();
    setIsFormVisible(false);
  };

  const handleUpdateUser = (data) => {
    const updatedUsers = users.map((user, index) => (index === editingUser ? data : user));
    setUsers(updatedUsers);
    reset();
    setEditingUser(null);
    setIsFormVisible(false);
  };

  const handleEditUser = (index) => {
    const userToEdit = users[index];
    setValue('cedula', userToEdit.cedula);
    setValue('nombre', userToEdit.nombre);
    setValue('apellidos', userToEdit.apellidos);
    setValue('correo', userToEdit.correo);
    setValue('contrasena', userToEdit.contrasena);
    setEditingUser(index);
    setIsFormVisible(true);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = (data) => {
    if (editingUser !== null) {
      handleUpdateUser(data);
    } else {
      handleCreateUser(data);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear administrador'}
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre, apellidos, cédula o correo"
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
              <th className="px-4 py-2 border">Correo</th>
              <th className="px-4 py-2 border">Contraseña</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.cedula}</td>
                <td className="border px-4 py-2">{user.nombre}</td>
                <td className="border px-4 py-2">{user.apellidos}</td>
                <td className="border px-4 py-2">{user.correo}</td>
                <td className="border px-4 py-2">{user.contrasena}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditUser(index)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteUser(index)} className="bg-red-500 text-white px-2 py-1 rounded">
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
          <h2 className="text-lg font-semibold mb-2">{editingUser !== null ? 'Editar Usuario' : 'Agregar Nuevo Administrador'}</h2>
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
            </div>
            <div className="flex mb-4">
              <div className="w-full">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="contrasena"
                  name="contrasena"
                  {...register('contrasena', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              {editingUser !== null ? 'Actualizar administrador' : 'Crear'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TableAdmin;