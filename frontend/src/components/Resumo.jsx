function Resumo({ resumo }) {
  return (
    <div className="resumo">
      <div className="resumo-item">
        <span>Total</span>
        <strong>{resumo.total}</strong>
      </div>
      <div className="resumo-item">
        <span>Média</span>
        <strong>{resumo.media_avaliacao}</strong>
      </div>
      <div className="resumo-item">
        <span>Melhor</span>
        <strong>{resumo.melhor ? resumo.melhor : "-"}</strong>
      </div>
    </div>
  );
}

export default Resumo;
