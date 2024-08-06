import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableAdmin = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [searchTerm, setSearchTerm] = useState('');

  const { users, getUsers, registerUser, disableUser, errors: registerUserErrors } = useUser();
  const [shouldFetchUsers, setShouldFetchUsers] = useState(true);

  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const formRef = useRef(null); // Referencia al formulario

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

  const handleUpdateUser = (data) => {
    // Implementa la lógica para actualizar un usuario existente
    reset();
    setEditingUser(null);
    setIsFormVisible(false);
  };

  const handleDeleteUser = async () => {
    // Implementa la lógica para eliminar un usuario
    const success = await disableUser(selectedUserId)
    if(success){ 
      toast.success('Admistrador inhabilitado con éxito');
      setIsDeleteModalOpen(false);
      setShouldFetchUsers(true);
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (!isFormVisible) {
      scrollFormIntoView(); // Llamar a la función para hacer scroll al formulario
    }
  };

  const onSubmit = handleSubmit(async (user) => {
    if (editingUser !== null) {
      handleUpdateUser(user);
    } else {
      const success = await registerUser(user);
      if (success) {
        setShouldFetchUsers(true);
        toast.success('Administrador creado con éxito');
        reset()
      }
    }
  });

  const scrollFormIntoView = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    if (shouldFetchUsers) {
      getUsers();
      setShouldFetchUsers(false);
    }
  }, [shouldFetchUsers, getUsers]);

  return (
    <div className="p-4">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm">
          {isFormVisible ? 'Cancelar' : 'Crear administrador'}
        </button>
        <input
          type="text"
          placeholder="Buscar por nombre, cédula"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded text-sm"
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
                <td className="border px-4 py-2 text-sm">{user.dni}</td>
                <td className="border px-4 py-2 text-sm">{user.name}</td>
                <td className="border px-4 py-2 text-sm">{user.lastname}</td>
                <td className="border px-4 py-2 text-sm">{user.email}</td>
                <td className="border px-4 py-2 text-sm">
                  {user.isActive && (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button onClick={() => openDeleteModal(user.dni)} className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-700 transition duration-300 ease-in-out">
                      Desactivar
                    </button>
                  </div>  
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div ref={formRef} /> {/* Referencia al formulario para hacer scroll */}
      {isFormVisible && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">{editingUser !== null ? 'Editar Usuario' : 'Agregar Nuevo Administrador'}</h2>
          {registerUserErrors.map((error, i) => (
            <p className="text-red-500" key={i}>{error}</p>
          ))}
          <form onSubmit={onSubmit}>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                  Cédula
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  {...register('dni', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                  disabled={editingUser !== null}
                />
                {errors.dni && <p className="text-red-500">La cédula es requerida</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register('name', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.name && <p className="text-red-500">El nombre es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                  Apellidos
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  {...register('lastname', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.lastname && <p className="text-red-500">El apellido es requerido</p>}
              </div>
              <div className="w-1/2 pl-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register('email', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.email && <p className="text-red-500">El correo electrónico es requerido</p>}
              </div>
            </div>
            <div className="flex mb-4">
              <div className="w-full">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register('password', { required: true })}
                  className="border border-gray-300 p-2 rounded w-full text-sm"
                />
                {errors.password && <p className="text-red-500">La contraseña es requerida</p>}
              </div>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded text-sm"
            >
              {editingUser !== null ? 'Actualizar administrador' : 'Crear'}
            </button>
          </form>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold">Confirmar Eliminación</h2>
            <p>¿Estás seguro de que deseas desactivar este Administrador?</p>
            <div className="flex justify-end">
              <button onClick={closeDeleteModal} className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mr-2">
                Cancelar
              </button>
              <button onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                Desactivar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableAdmin;
