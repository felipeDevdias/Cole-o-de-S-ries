import { useEffect, useState } from "react";
import "./App.css";
import Resumo from "./components/Resumo.jsx";
import Formulario from "./components/Formulario.jsx";
import Lista from "./components/Lista.jsx";

const API = "http://127.0.0.1:8000/api/series/";

function App() {
  // dados do Django
  const [series, setSeries] = useState([]);
  const [resumo, setResumo] = useState({
    total: 0,
    media_avaliacao: 0,
    melhor: null,
  });

  // formulario
  const [titulo, setTitulo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [ano, setAno] = useState("");
  const [avaliacao, setAvaliacao] = useState("");

  // erro e busca
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");

  function carregarSeries() {
    fetch(API)
      .then((res) => res.json())
      .then((dados) => setSeries(dados));
  }

  function carregarResumo() {
    fetch(API + "resumo/")
      .then((res) => res.json())
      .then((dados) => setResumo(dados));
  }

  // quando a pagina abre, busca a lista e o resumo
  useEffect(() => {
    carregarSeries();
    carregarResumo();
  }, []);

  async function cadastrar(evento) {
    evento.preventDefault();

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          plataforma,
          ano: Number(ano),
          avaliacao: Number(avaliacao),
        }),
      });
      const dados = await res.json();

      // erro 400 do Django
      if (!res.ok) {
        setErro(dados.erro);
        return;
      }

      // Cadastro ok + reset da tela
      setErro("");
      setTitulo("");
      setPlataforma("");
      setAno("");
      setAvaliacao("");
      carregarSeries();
      carregarResumo();
    } catch {
      setErro("Não foi possivel falar com o servidor. O Django esta ligado?");
    }
  }

  // busca pelo titulo
  const seriesFiltradas = series.filter((serie) =>
    serie.titulo.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div className="pagina">
      <h1>Minha coleção de séries</h1>

      <Resumo resumo={resumo} />

      <Formulario
        titulo={titulo}
        setTitulo={setTitulo}
        plataforma={plataforma}
        setPlataforma={setPlataforma}
        ano={ano}
        setAno={setAno}
        avaliacao={avaliacao}
        setAvaliacao={setAvaliacao}
        erro={erro}
        aoEnviar={cadastrar}
      />

      <Lista series={seriesFiltradas} busca={busca} setBusca={setBusca} />
    </div>
  );
}

export default App;
