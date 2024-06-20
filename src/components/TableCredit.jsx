import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const TableCredit = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [searchTerm, setSearchTerm] = useState('');
  const [credits, setCredits] = useState([
    { numeroCredito: 'C123', propietarioCc: '100200300', nombre: 'Juan', apellidos: 'Perez' },
    { numeroCredito: 'C456', propietarioCc: '400500600', nombre: 'Ana', apellidos: 'Gomez' },
  ]);

  const [editingCredit, setEditingCredit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCredits = credits.filter(
    (credit) =>
      credit.numeroCredito.includes(searchTerm) ||
      credit.propietarioCc.includes(searchTerm) ||
      credit.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      credit.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCredit = (data) => {
    setCredits([...credits, data]);
    reset();
    setIsFormVisible(false);
  };

  const handleUpdateCredit = (data) => {
    const updatedCredits = credits.map((credit, index) => (index === editingCredit ? data : credit));
    setCredits(updatedCredits);
    reset();
    setEditingCredit(null);
    setIsFormVisible(false);
  };

  const handleEditCredit = (index) => {
    const creditToEdit = credits[index];
    setValue('numeroCredito', creditToEdit.numeroCredito);
    setValue('propietarioCc', creditToEdit.propietarioCc);
    setValue('nombre', creditToEdit.nombre);
    setValue('apellidos', creditToEdit.apellidos);
    setEditingCredit(index);
    setIsFormVisible(true);
  };

  const handleDeleteCredit = (index) => {
    setCredits(credits.filter((_, i) => i !== index));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const onSubmit = (data) => {
    if (editingCredit !== null) {
      handleUpdateCredit(data);
    } else {
      handleCreateCredit(data);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={toggleFormVisibility} className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded">
          {isFormVisible ? 'Cancelar' : 'Crear crédito'}
        </button>
        <input
          type="text"
          placeholder="Buscar por número de crédito, CC, nombre o apellidos"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Número de Crédito</th>
              <th className="px-4 py-2 border">Propietario CC</th>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellidos</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCredits.map((credit, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{credit.numeroCredito}</td>
                <td className="border px-4 py-2">{credit.propietarioCc}</td>
                <td className="border px-4 py-2">{credit.nombre}</td>
                <td className="border px-4 py-2">{credit.apellidos}</td>
                <td className="border px-4 py-2">
                  <button onClick={() => handleEditCredit(index)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCredit(index)} className="bg-red-500 text-white px-2 py-1 rounded">
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
          <h2 className="text-lg font-semibold mb-2">{editingCredit !== null ? 'Editar Crédito' : 'Agregar Nuevo Crédito'}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="socio" className="block text-sm font-medium text-gray-700">
                Socio
              </label>
              <select
                id="socio"
                name="socio"
                {...register('socio', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="Juan">Juan</option>
                <option value="Ana">Ana</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                Valor
              </label>
              <select
                id="valor"
                name="valor"
                {...register('valor', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="1000">1000</option>
                <option value="2000">2000</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="fechaDesembolso" className="block text-sm font-medium text-gray-700">
                Fecha de Desembolso
              </label>
              <select
                id="fechaDesembolso"
                name="fechaDesembolso"
                {...register('fechaDesembolso', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="2023-01-01">2023-01-01</option>
                <option value="2023-02-01">2023-02-01</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="interes" className="block text-sm font-medium text-gray-700">
                Interés
              </label>
              <select
                id="interes"
                name="interes"
                {...register('interes', { required: true })}
                className="border border-gray-300 p-2 rounded w-full"
              >
                <option value="5%">5%</option>
                <option value="10%">10%</option>
                {/* Agrega más opciones según sea necesario */}
              </select>
            </div>
            <button
              type="submit"
              className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded"
            >
              {editingCredit !== null ? 'Actualizar crédito' : 'Crear crédito'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TableCredit;