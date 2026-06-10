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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-2xl">

        <h1 className="text-4xl text-center font-bold mb-6 text-blue-700">
          Sistema de Tarefas
        </h1>

        <form
          onSubmit={criarTarefa}
          className="flex flex-col gap-4 mb-6"
        >
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 transition text-white p-3 rounded-lg font-semibold"
          >
            Criar tarefa
          </button>
        </form>

        <div className="flex flex-col gap-4">
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex justify-between items-center shadow"
            >
              <div>
                <h2 className="font-bold">
                  {tarefa.titulo}
                </h2>

                <p>
                  {tarefa.descricao}
                </p>
              </div>

              <button
                onClick={() => deletarTarefa(tarefa.id)}
                className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;