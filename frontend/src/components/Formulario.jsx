function Formulario({
  titulo, setTitulo,
  plataforma, setPlataforma,
  ano, setAno,
  avaliacao, setAvaliacao,
  erro, aoEnviar,
}) {
  return (
    <form onSubmit={aoEnviar}>
      <h2>Cadastrar série</h2>

      <input
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <input
        placeholder="Plataforma"
        value={plataforma}
        onChange={(e) => setPlataforma(e.target.value)}
        required
      />

      <input
        placeholder="Ano"
        type="number"
        value={ano}
        onChange={(e) => setAno(e.target.value)}
        required
      />

      <input
        placeholder="Avaliação"
        type="number"
        step="any"
        value={avaliacao}
        onChange={(e) => setAvaliacao(e.target.value)}
        required
      />

      {erro && <p className="erro">{erro}</p>}

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default Formulario;
