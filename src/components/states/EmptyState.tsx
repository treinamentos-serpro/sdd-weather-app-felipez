function EmptyState() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-labelledby="empty-state-title"
      className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white backdrop-blur-md"
    >
      <h2 id="empty-state-title" className="text-lg font-semibold">
        Nenhuma cidade encontrada
      </h2>
      <p className="mt-2 text-sm text-white/70">Tente buscar por outra cidade.</p>
    </section>
  );
}

export default EmptyState;
