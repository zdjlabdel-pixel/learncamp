export default function ReplayPanel({ replays }) {
  return (
    <section className="card">
      <h3>Replays sécurisés</h3>
      <ul>
        {replays.map((replay) => (
          <li key={replay.id}>
            {replay.title} - {replay.duration}
          </li>
        ))}
      </ul>
    </section>
  );
}
