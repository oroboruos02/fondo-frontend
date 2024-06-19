import React, { useState } from 'react';

const TableUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([
    { nombre: 'Juan', apellidos: 'Perez', telefono: '123456789', correo: 'juanperez@gmail.com', contrasena: 'password1' },
    { nombre: 'Ana', apellidos: 'Gomez', telefono: '987654321', correo: 'anagomez@gmail.com', contrasena: 'password2' },
  ]);

  const [newUser, setNewUser] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    correo: '',
    contrasena: '',
  });

  const [editingUser, setEditingUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.telefono.includes(searchTerm)
  );

  const handleCreateUser = () => {
    if (newUser.nombre.trim() === '' || newUser.apellidos.trim() === '' || newUser.telefono.trim() === '' || newUser.correo.trim() === '' || newUser.contrasena.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    setUsers([...users, newUser]);
    setNewUser({
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      contrasena: '',
    });
    setIsFormVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleDeleteUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleEditUser = (index) => {
    setEditingUser(index);
    setNewUser(users[index]);
    setIsFormVisible(true);
  };

  const handleUpdateUser = () => {
    if (newUser.nombre.trim() === '' || newUser.apellidos.trim() === '' || newUser.telefono.trim() === '' || newUser.correo.trim() === '' || newUser.contrasena.trim() === '') {
      alert('Por favor completa todos los campos.');
      return;
    }

    const updatedUsers = users.map((user, index) => (index === editingUser ? newUser : user));
    setUsers(updatedUsers);
    setNewUser({
      nombre: '',
      apellidos: '',
      telefono: '',
      correo: '',
      contrasena: '',
    });
    setEditingUser(null);
    setIsFormVisible(false);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear usuario'}
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
              <th className="px-4 py-2 border">Contraseña</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{user.nombre}</td>
                <td className="border px-4 py-2">{user.apellidos}</td>
                <td className="border px-4 py-2">{user.telefono}</td>
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
          <h2 className="text-lg font-semibold mb-2">{editingUser !== null ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
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
                  value={newUser.nombre}
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
                  value={newUser.apellidos}
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
                  value={newUser.telefono}
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
                  value={newUser.correo}
                  onChange={handleChange}
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
                  value={newUser.contrasena}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={editingUser !== null ? handleUpdateUser : handleCreateUser}
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              {editingUser !== null ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TableUser;