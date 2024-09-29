import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SupplierList.css';

const SupplierList = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFornecedores = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('https://api-infnet-produtos-privado.vercel.app/fornecedores', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFornecedores(data);
      }
    };

    fetchFornecedores();
  }, []);

  const handleView = (id) => {
    navigate(`/fornecedores/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/edit-fornecedor/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await fetch(`https://api-infnet-produtos-privado.vercel.app/fornecedores/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    setFornecedores(fornecedores.filter((fornecedor) => fornecedor._id !== id));
  };

  return (
    <div className="supplier-list-container">
      <h1>Lista de Fornecedores</h1>
      <button className="create-button" onClick={() => navigate('/create-supplier')}>Criar Novo Fornecedor</button>
      <table className="supplier-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor._id}>
              <td>{fornecedor.nome}</td>
              <td>
                <button className="view-button" onClick={() => handleView(fornecedor._id)}>Ver</button>
                <button className="edit-button" onClick={() => handleEdit(fornecedor._id)}>Editar</button>
                <button className="delete-button" onClick={() => handleDelete(fornecedor._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierList;
