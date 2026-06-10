import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function carregarTarefas() {
    const response = await api.get('/tarefas');

    setTarefas(response.data);
  }

  async function criarTarefa(e) {
    e.preventDefault();

    try {
      await api.post('/tarefas', { titulo, descricao });

      setTitulo('');
      setDescricao('');

      carregarTarefas();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      alert('Erro ao criar tarefa. Verifique o servidor.');
    }
  }

  async function deletarTarefa(id) {
    try {
      await api.delete(`/tarefas/${id}`);
      carregarTarefas();
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa. Verifique o servidor.');
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-lg border border-gray-100">

        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Sistema de Tarefas</h1>
            <p className="text-sm text-slate-500">Organize suas tarefas de forma simples e rápida</p>
          </div>

          <div className="text-right text-sm text-slate-500">v1.0</div>
        </header>

        <section className="mb-8">
          <form onSubmit={criarTarefa} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Título"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="col-span-1 md:col-span-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="text"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="col-span-1 md:col-span-1 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <div className="col-span-1 md:col-span-1 flex items-center">
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold shadow">Criar tarefa</button>
            </div>
          </form>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-4">
            {tarefas.length === 0 ? (
              <div className="text-center text-slate-500 py-12">Nenhuma tarefa cadastrada</div>
            ) : (
              tarefas.map((tarefa) => (
                <div key={tarefa.id} className="flex items-center justify-between gap-4 p-4 bg-gradient-to-r from-white to-slate-50 rounded-xl border border-gray-100 shadow-sm">
                  <div>
                    <h2 className="font-semibold text-slate-800">{tarefa.titulo}</h2>
                    <p className="text-sm text-slate-500">{tarefa.descricao}</p>
                    <div className="text-xs text-slate-400 mt-1">Criada em: {new Date(tarefa.createdAt).toLocaleString()}</div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => deletarTarefa(tarefa.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Excluir</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

export default App;