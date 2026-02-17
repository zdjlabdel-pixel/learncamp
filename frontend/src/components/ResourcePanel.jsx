export default function ResourcePanel({ resources }) {
  return (
    <section className="card">
      <h3>Ressources</h3>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            {resource.title} <strong>{resource.type}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
