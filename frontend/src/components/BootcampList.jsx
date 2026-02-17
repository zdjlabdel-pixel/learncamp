export default function BootcampList({ bootcamps }) {
  return (
    <section className="card">
      <h3>Bootcamps actifs</h3>
      {bootcamps.map((bootcamp) => (
        <article key={bootcamp.id} className="item">
          <h4>{bootcamp.title}</h4>
          <p>{bootcamp.description}</p>
          <small>Prochaine session: {bootcamp.nextSession}</small>
          <small>{bootcamp.participants} participants</small>
        </article>
      ))}
    </section>
  );
}
