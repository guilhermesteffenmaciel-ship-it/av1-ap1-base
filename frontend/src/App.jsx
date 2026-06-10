import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');

  async function carregarTarefas() {
    try {
      const response = await api.get('/tarefas');

      // If API returns an error object, show it and keep tarefas as array
      if (response.data && !Array.isArray(response.data)) {
        console.error('API error:', response.data);
        alert(response.data.error || 'Erro ao carregar tarefas');
        setTarefas([]);
        return;
      }

      setTarefas(response.data || []);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      alert('Erro ao carregar tarefas. Verifique o servidor.');
      setTarefas([]);
    }
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-6 font-sans" style={{ fontFamily: 'Inter, system-ui, Arial' }}>
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg mb-8">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd" alt="hero" className="w-full h-44 md:h-56 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>
          <div className="absolute left-6 bottom-6 text-white">
            <h1 className="text-2xl md:text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Organize suas tarefas com estilo</h1>
            <p className="mt-1 text-sm md:text-base opacity-90">Uma interface limpa, imagens inspiradoras e microinterações.</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">

        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">Sistema de Tarefas</h1>
            <p className="text-sm text-slate-500">Organize suas tarefas de forma simples e rápida</p>
          </div>

          <div className="text-right text-sm text-slate-500">v1.0</div>
        </header>

        <section className="mb-8">
          <form onSubmit={criarTarefa} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
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
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-semibold shadow transition-transform transform-gpu hover:-translate-y-0.5">Criar tarefa</button>
            </div>
          </form>
        </section>

        <section>
          <div className="grid grid-cols-1 gap-4">
            {tarefas.length === 0 ? (
              <div className="text-center text-slate-500 py-12">Nenhuma tarefa cadastrada</div>
            ) : (
              tarefas.map((tarefa) => (
                <div key={tarefa.id} className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm card-fade">
                  <div className="flex items-center gap-4">
                    <img src={`https://picsum.photos/seed/${tarefa.id}/80/80`} alt="thumb" className="w-20 h-20 rounded-lg object-cover shadow-sm" />
                    <div>
                      <h2 className="font-semibold text-slate-800">{tarefa.titulo}</h2>
                      <p className="text-sm text-slate-500">{tarefa.descricao}</p>
                      <div className="text-xs text-slate-400 mt-1">Criada em: {new Date(tarefa.createdAt).toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button onClick={() => deletarTarefa(tarefa.id)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-transform hover:-translate-y-0.5">Excluir</button>
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