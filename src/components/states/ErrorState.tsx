interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

function ErrorState({ message = 'Não foi possível carregar os dados.', onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-xl border border-red-300/30 bg-red-950/30 p-4 text-center text-white backdrop-blur-md sm:p-6"
    >
      <p className="break-words">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-accent-500 px-4 py-2 font-medium text-white transition hover:bg-accent-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-night-900"
      >
        Tentar novamente
      </button>
    </div>
  );
}

export default ErrorState;
