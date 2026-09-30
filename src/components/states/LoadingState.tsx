function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-32 items-center justify-center rounded-xl border border-white/10 bg-white/5 p-4 text-white backdrop-blur-md sm:p-6"
    >
      <span
        className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-accent-400"
        aria-hidden="true"
      />
      <span>Carregando previsão...</span>
    </div>
  );
}

export default LoadingState;
