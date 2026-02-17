const providers = ['Wave', 'Orange Money', 'MTN MoMo', 'Airtel Money'];

export default function MobileMoneyCard() {
  return (
    <section className="card">
      <h3>Paiement Mobile Money</h3>
      <p>Activez l’accès élève après confirmation de paiement.</p>
      <div className="chips">
        {providers.map((provider) => (
          <span key={provider} className="chip">
            {provider}
          </span>
        ))}
      </div>
      <button className="primary">Simuler un paiement</button>
    </section>
  );
}
