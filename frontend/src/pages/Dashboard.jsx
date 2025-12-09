import React, { useEffect, useState } from "react";
import { dashboardService } from "../services/dashboardService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (err) {
        setError("Erro ao carregar dados do dashboard.");
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading)
    return <div className="dashboard-loading">Carregando dashboard...</div>;
  if (error) return <div className="dashboard-error">{error}</div>;
  if (!stats) return null;

  const categoryData = stats.livrosPorCategoria.map((item) => ({
    name: item.categoria,
    quantidade: item.total,
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  const tooltipStyle = {
    contentStyle: {
      backgroundColor: "#fff",
      border: "none",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      padding: "10px",
    },
    itemStyle: { color: "#333", fontSize: "14px" },
    labelStyle: { color: "#000", fontWeight: "bold", marginBottom: "5px" },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Visão Geral</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Livros</h3>
          <p className="stat-value">{stats.totalLivros}</p>
        </div>
        <div className="stat-card">
          <h3>Total de Usuários</h3>
          <p className="stat-value">{stats.totalUsuarios}</p>
        </div>
        <div className="stat-card">
          <h3>Média de Ano</h3>
          <p className="stat-value">{Math.round(stats.mediaAno)}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <h2 className="chart-title">Livros por Categoria</h2>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <XAxis
                  dataKey="name"
                  stroke="var(--text-color)"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="var(--text-color)"
                  fontSize={12}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.1)" }}
                  {...tooltipStyle}
                />
                <Legend />
                <Bar
                  dataKey="quantidade"
                  fill="#8884d8"
                  name="Qtd. Livros"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-wrapper">
          <h2 className="chart-title">Distribuição</h2>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="quantidade"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#82ca9d"
                  paddingAngle={5}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
