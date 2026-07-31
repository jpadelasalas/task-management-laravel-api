export function Pagination({ meta, onPageChange }) {
  if (!meta || meta.last_page <= 1) {
    return null
  }

  return (
    <div className="flex items-center justify-between border-t border-line px-1 py-3">
      <p className="text-xs text-muted">
        Page {meta.current_page} of {meta.last_page} · {meta.total} total
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={meta.current_page <= 1}
          onClick={() => onPageChange(meta.current_page - 1)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={meta.current_page >= meta.last_page}
          onClick={() => onPageChange(meta.current_page + 1)}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
