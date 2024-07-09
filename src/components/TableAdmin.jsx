/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableAdmin = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const { users, getUsers, registerUser, errors: registerUserErrors } = useUser();
  const [shouldFetchUsers, setShouldFetchUsers] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.dni.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = (data) => {
    setUsers([...users, data]);
    reset();
    setIsFormVisible(false);
    toast.success('Administrador creado con éxito');
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
    setValue('dni', userToEdit.dni);
    setValue('name', userToEdit.name);
    setValue('lastname', userToEdit.lastname);
    setValue('email', userToEdit.email);
    setEditingUser(index);
    setIsFormVisible(true);
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = handleSubmit(async (user) => {
    if (editingUser !== null) {
      handleUpdateUser(user);
    } else {
      const success = await registerUser(user);
      if (success) {
        setShouldFetchUsers(true);
        toast.success('Administrador creado con éxito');
      }
    }
  });

  useEffect(() => {
    if (shouldFetchUsers) {
      getUsers();
      setShouldFetchUsers(false);
    }
  }, [shouldFetchUsers]);

  return (
    <div className="p-4">
      <ToastContainer />
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
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.dni}</td>
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2">{user.lastname}</td>
                <td className="border px-4 py-2">{user.email}</td>
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
          {registerUserErrors.map((error, i) => (
            <p className="text-red-500" key={i}>{error}</p>
          ))}
          <form onSubmit={onSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  {...register('dni', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                  disabled={editingUser !== null}
                />
                {errors.dni && <p className="text-red-500">La cédula es requerida</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register('name', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.name && <p className="text-red-500">El nombre es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  {...register('lastname', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.lastname && <p className="text-red-500">El apellido es requerido</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register('email', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.email && <p className="text-red-500">El correo electrónico es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-full">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register('password', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full"
                />
                {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
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
