import React, { useEffect, useState } from 'react';
import { dashboardService } from '../services/dashboardService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css'; // Vamos criar este CSS a seguir

const Dashboard = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  // Cores para o gráfico de pizza
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const data = await dashboardService.getDados();
      setDados(data);
    } catch (error) {
      setErro('Erro ao carregar dados do dashboard.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Carregando estatísticas...</div>;
  if (erro) return <div className="alert alert-error">{erro}</div>;
  if (!dados) return null;

  return (
    <div className="container dashboard-container">
      <h1>📊 Dashboard Analítico</h1>

      {/* Cartões de Resumo */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Livros</h3>
          <p className="stat-number">{dados.totalLivros}</p>
        </div>
        <div className="stat-card">
          <h3>Total de Avaliações</h3>
          <p className="stat-number">{dados.totalReviews}</p>
        </div>
        <div className="stat-card">
          <h3>Média de Notas</h3>
          <p className="stat-number">⭐ {dados.mediaNota}</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        
        {/* Gráfico 1: Barras - Livros por Categoria */}
        <div className="chart-card">
          <h3>📚 Livros por Categoria</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={dados.livrosPorCategoria}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" name="Qtd. Livros" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Pizza - Distribuição Visual */}
        <div className="chart-card">
          <h3>🍰 Distribuição (Pizza)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dados.livrosPorCategoria}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="quantidade"
                >
                  {dados.livrosPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;