function Lista({ series, busca, setBusca }) {
  return (
    <div>
      <h2>Séries cadastradas</h2>

      <input
        className="busca"
        placeholder="Buscar pelo título..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {series.length === 0 ? (
        <p className="vazio">Nenhum item encontrado</p>
      ) : (
        <ul>
          {series.map((serie) => (
            <li key={serie.id}>
              <strong>{serie.titulo}</strong>
              <span>
                {serie.plataforma} · {serie.ano} · nota {serie.avaliacao}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Lista;
