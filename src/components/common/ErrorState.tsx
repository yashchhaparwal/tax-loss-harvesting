interface ErrorStateProps {
  message?: string
  onRetry?: () => void | Promise<void>
}

const ErrorState = ({ message = 'Something went wrong.', onRetry }: ErrorStateProps) => {
  return (
    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-6 text-center">
      <p className="text-sm text-red-300">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md bg-red-500/20 px-3 py-1.5 text-sm text-red-100 transition hover:bg-red-500/30"
        >
          Retry
        </button>
      ) : null}
    </div>
  )
}

export default ErrorState
