export default function ChatPanel({ messages }) {
  return (
    <section className="card">
      <h3>Chat live</h3>
      <div className="chat">
        {messages.map((message) => (
          <p key={message.id}>
            <strong>{message.sender}:</strong> {message.content}
          </p>
        ))}
      </div>
      <input placeholder="Écrire un message..." />
    </section>
  );
}
