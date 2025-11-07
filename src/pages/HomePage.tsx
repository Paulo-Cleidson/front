import React, { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../api/token';
import { listarCarteiras } from '../api/carteiras';
import { obterResumoTransacoes } from '../api/resumo';
import TransactionForm from '../components/organisms/TransactionForm';

const HomePage: React.FC = () => {
  const username = getCurrentUser();
  const [carteiras, setCarteiras] = useState<any[]>([]);
  const [resumo, setResumo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchCarteiras = async () => {
    try {
      console.log('Fetching carteiras...');
      const data = await listarCarteiras();
      console.log('Carteiras data:', data);
      
      if (Array.isArray(data)) {
        setCarteiras(data);
      } else if (data && Array.isArray(data.results)) {
        setCarteiras(data.results);
      } else {
        setCarteiras([]);
      }
    } catch (error) {
      console.error('Erro ao carregar carteiras:', error);
      setCarteiras([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchResumo = async () => {
    try {
      const data = await obterResumoTransacoes();
      setResumo(data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
      setResumo(null);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchCarteiras(), fetchResumo()]);
    };
    fetchAllData();
  }, []);

  const handleTransactionCreated = () => {
    fetchCarteiras();
    fetchResumo();
  };

  const totalBalance = Array.isArray(carteiras) 
    ? carteiras.reduce((total, carteira) => {
        return total + parseFloat(carteira.saldo || 0);
      }, 0)
    : 0;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header">
          <div className="header-content">
            <h1>Página Inicial</h1>
            <div className="header-info">
              <div className="balance-display">
                <span>$</span>
                <span>{loading ? 'Carregando...' : `R$ ${totalBalance.toFixed(2)}`}</span>
              </div>
              <span>{username}</span>
              <button onClick={handleLogout}>Sair</button>
            </div>
          </div>
        </div>

        <div className="content-grid">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Bem-vindo, {username}!</h2>
            <p>Você está logado com sucesso.</p>
            
            {resumo && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Resumo Financeiro:</h3>
                <p>Receitas: R$ {resumo.total_receitas?.toFixed(2) || '0.00'}</p>
                <p>Despesas: R$ {resumo.total_despesas?.toFixed(2) || '0.00'}</p>
                <p className="font-bold">Balanço: R$ {resumo.saldo?.toFixed(2) || '0.00'}</p>
              </div>
            )}
          </div>

          <div className="card">
            <TransactionForm onTransactionCreated={handleTransactionCreated} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;