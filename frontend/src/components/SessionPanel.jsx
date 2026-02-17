export default function SessionPanel() {
  return (
    <section className="card live">
      <h3>Session Live native</h3>
      <p>Vidéo/audio WebRTC, partage d’écran, chat en temps réel.</p>
      <div className="live-actions">
        <button className="primary">Démarrer la session</button>
        <button className="ghost">Partager écran</button>
      </div>
    </section>
  );
}
